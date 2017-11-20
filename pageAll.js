var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

//入口
for (var t = 0; t < 6; t++) {
    console.log("第" + t + "个页面");
    startRequest("http://www.qggwsc.net/index.php/Home/Shop/shopmain/province_id/6/city_id/77/p/" + t + ".html");
}

function startRequest(x) {
    http.get(x, function (res) {
        var html = '';

        res.setEncoding('utf-8');

        res.on('data', function (chunk) {
            html += chunk;
        });

        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            var $ = cheerio.load(html); //采用cheerio模块解析html

            var lianxiren = [];
            var dianhua = [];
            var gongsi = [];
            var dizhi = [];

            for (var i = 0; i < $('.shop-title').length; i++) {
                lianxiren.push($('.shop-title')[i].children[0].data.trim());
            }

            for (var j = 0; j < $('.shop-title').length; j++) {
                dianhua.push($('.shop-title').next()[j].children[0].data.trim());
            }

            for (var k = 0; k < $('.shop-title').length; k++) {
                gongsi.push($('.shop-title').next().next()[k].children[0].data.trim());
            }

            for (var o = 0; o < $('.shop-title').length; o++) {
                dizhi.push($('.shop-title').next().next().next()[o].children[0].data.trim());
            }

            var str = "";
            for (var y = 0; y < lianxiren.length; y++) {
                str += "店名：" + lianxiren[y] + "\n" +
                    dianhua[y] + "\n" +
                    gongsi[y] + "\n" +
                    dizhi[y] + "\n\n";
            }

            //存储查询的信息
            fs.appendFile('./pageAll.txt', str, 'utf-8', function (err) {
            });

        });
    }).on('error', function (err) {
        console.log(err);
    });
}

