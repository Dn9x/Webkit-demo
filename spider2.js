var http = require('http');
var fs = require('fs');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var util = require('util');
var models = require('./model/db'),
  Users = models.Users;

exports.getu = function(name, callback){
        console.log('name : %s', name);
    var url = "http://cnodejs.org/user/" + name;
    //抓取
    http.get(url , function(res){

        console.log('name url : %s', url);
        //保存抓取信息
        var st = '';

        //设置编码
        res.setEncoding('binary');

        //拼接抓取数据
        res.on('data' , function(d){
            st += d; 
        }).on('error',function(err){
            //如果出错就输出
            console.log(err.message);
        }).on('end', function(){
            sp2(st);
        });
        
    }).on('error', function(err){
        console.log(err.message);
    });
};


function sp2(cont){

    //加载整个文档，也就是上面抓取到的数据
    $ = cheerio.load(cont);

    //获取帖子的链接
    var n = $('a.dark').html();

    console.log('n %s', n);

    var buf1 = new Buffer(n ,'binary');
    var name = iconv.decode(buf1 , 'utf-8'); 


            console.log('sp2 name:' + name);
    
    //获取帖子的title
    var m = $('div.user_profile p').html();
    var buf2 = new Buffer(m ,'binary');
    var mono = iconv.decode(buf2 , 'utf-8'); 

    //获取帖子的最新时间
    var j = $('p.col_fade').html();
    var buf3 = new Buffer(j ,'binary');
    var join = iconv.decode(buf3 , 'utf-8'); 

    saveu(name, mono, join);
}

function saveu(name, mono, join){
    var users = new Users({name: name, mono:mono, desc: '23', join: join});

    users.save(function(err){
        if(err){
            console.log('error: %s', err);
        }

        console.log('%s users save success', users);
    });
}

