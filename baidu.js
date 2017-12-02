var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var url = require('url');
//入口
var fs = require('fs');
var a = fs.readFileSync("D:\\s\\c.txt", "utf-8");


for (var i = 0; i < a.split('-').length; i++) {
    var g = a.split('-')[i].split(',');
    startRequest("http://www.baidu.com/s?wd=" + encodeURI((g[1] + "区号")), g[0]);
}

function startRequest(x, qq) {

    http.get(x, function (res) {
        var html = '';

        res.setEncoding('utf-8');

        res.on('data', function (chunk) {
            html += chunk;
        });

        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            var $ = cheerio.load(html); //采用cheerio模块解析html

            var a = $('.op_exactqa_s_answer').text().trim();

            var str = + qq + "," + a + "-\n";


            //存储查询的信息
            fs.appendFile('./pageAll.txt', str, 'utf-8', function (err) {
            });

        });
    }).on('error', function (err) {
        console.log(err);
    });
}

