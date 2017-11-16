var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 1;
var url = "http://www.sz-ylh.com/mobile/shop/detail/shop_id/1.html";

//初始url

function fetchPage(x) {     //封装了一层函数
    startRequest(x);
}

function startRequest(x) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {

            var $ = cheerio.load(html); //采用cheerio模块解析html

            var info = {
                //联系人
                Contact: "姓名：" + $('div.x9 p:last-child').text().trim().substring(4),
                //电话
                phone: "电话：" + $('div.x9 .text-large').text().trim(),
                //公司
                firm: "公司：" + $('div.top-title').text().trim(),
                //地址
                address: "地址：" + $('div.x9 .addr').text().trim(),
            };

            var str = info.Contact + "\n" + info.phone + "\n" + info.firm + "\n" + info.address + "\n\n";

            //存储查询的信息
            fs.appendFile('./data/data.txt', str, 'utf-8', function (err) {

            });
            console.log(i);
            //下一个链接接着爬
            i++;
            //下一篇文章的url
            var nextLink = encodeURI("http://www.sz-ylh.com/mobile/shop/detail/shop_id/" + i + ".html");

            //这是亮点之一，通过控制I,可以控制爬取多少篇文章.
            if (i <= 1938) {
                fetchPage(nextLink);
            }
        });
    }).on('error', function (err) {
        console.log(err);
    });
}

//主程序开始运行
fetchPage(url);