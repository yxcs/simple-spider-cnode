var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var iconv = require('iconv-lite');  //进行编码转换，暂未用到

var db = require('./db');

var page = 3;    // 设置读取多少页
var urlLists = [];

for(var i = 1; i <= page; i ++) {
  urlLists.push(i);
}

async.eachSeries(urlLists, function(item, callback) {
  var lists = [];
  request.get('http://cnodejs.org/?tab=all&page='+item, function(err, res ,body) {
    var $ = cheerio.load(body);
    $('.pull-right').each(function(index, ele) {
      var url = $(this).attr('href');
      if(url != undefined && url != null) {
        lists.push(url);
      }
    })

    var contents = [];

    async.eachSeries(lists, function(v,cb) {
        request.get('http://cnodejs.org'+v, function(err, res, body) {
          var $ = cheerio.load(body, { decodeEntities: false });  //{ decodeEntities: false }  用于防止中文转码
          var content = $('.topic_content').html();
          var title = $('.topic_full_title').html();

          contents.push({content: content, title: title})

          cb()
        })
    }, function(err) {
        console.log('正在读第'+item+'页')
        db.insterData(contents, function() {
            callback();
        })
    })

  })
}, function(err) {
    console.log('读取结束')
})
