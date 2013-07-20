var http = require('http');
var fs = require('fs');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var util = require('util');
var models = require('./model/db'),
  Tits = models.Tits, Users = models.Users
  , Cells = models.Cells, Repls = models.Repls;

//要抓取的网址，这里只能抓取这个url
//var url = "http://cnodejs.org/?page="

exports.gett = function(url, callback){
        console.log('url : %s', url);
    //抓取
    http.get(url , function(res){
        //保存抓取信息
        var stack = '';

        var j = 0;

        //设置编码
        res.setEncoding('binary');

        //拼接抓取数据
        res.on('data' , function(d){
            stack += d; 

            console.log('J: %s', j);

            j++;
        }).on('error',function(err){
            //如果出错就输出
            console.log(err.message);
        }).on('end', function(){
            sp(stack);

            callback();
        });

    }).on('error', function(err){
        console.log(err.message);
    });
};

exports.getu = function(name, callback){
        console.log('name : %s', name);
    var url = "http://cnodejs.org/user/" + name;
    //抓取
    http.get(url , function(res){

        console.log('name url : %s', url);
        //保存抓取信息
        var st = '';

        var j = 0;

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

            callback();
        });
        
    }).on('error', function(err){
        console.log(err.message);
    });
};

exports.getc = function(name, callback){
        console.log('name : %s', name);
    var url = "http://cnodejs.org/user/"+name+"/topics";
    //抓取
    http.get(url , function(res){

        console.log('name url : %s', url);
        //保存抓取信息
        var st = '';

        var j = 0;

        //设置编码
        res.setEncoding('binary');

        //拼接抓取数据
        res.on('data' , function(d){
            st += d; 
        }).on('error',function(err){
            //如果出错就输出
            console.log(err.message);
        }).on('end', function(){
            sp3(st);

            callback();
        });
        
    }).on('error', function(err){
        console.log(err.message);
    });
};

exports.getr = function(name, callback){
        console.log('name : %s', name);
    var url = "http://cnodejs.org/user/"+name+"/replies";
    //抓取
    http.get(url , function(res){

        console.log('name url : %s', url);
        //保存抓取信息
        var st = '';

        var j = 0;

        //设置编码
        res.setEncoding('binary');

        //拼接抓取数据
        res.on('data' , function(d){
            st += d; 
        }).on('error',function(err){
            //如果出错就输出
            console.log(err.message);
        }).on('end', function(){
            sp4(st);

            callback();
        });
        
    }).on('error', function(err){
        console.log(err.message);
    });
};

exports.getus = function(name, callback){

    Users.find({ 'name': name }, function (err, docs) { 
    	console.log(docs);
    	callback(docs);
    });
};

exports.getcs = function(callback){

    Cells.find(function (err, docs) { 
        callback(docs);
    });
};

exports.getts = function(callback){

    Tits.find(function (err, docs) { 
        callback(docs);
    });
};

exports.getrs = function(callback){

    Repls.find(function (err, docs) { 
        callback(docs);
    });
};

//拼接抓取到数据里面有用的信息
function sp(cont){
	//加载整个文档，也就是上面抓取到的数据
	$ = cheerio.load(cont);

	//获取首页有多少个帖子
    var count = $('div.topic_wrap').length;

	//用于拼接有用数据
    var data = '';

    console.log('count %s', count);

	//循环获取并处理
    for(var i=0;i<count;i++){
        console.log('i : ' + i);

        var ct6 = $('div.cell div.user_avatar img').eq(i).attr('src');
        var buf6 = new Buffer(ct6 ,'binary');
        var head = iconv.decode(buf6 , 'utf-8'); 

        var ct5 = $('div.cell div.count a').eq(i).html() + '/' + $('div.cell div.count span').eq(i).html();
        var buf5 = new Buffer(ct5 ,'binary');
        var repl = iconv.decode(buf5 , 'utf-8'); 

        //获取帖子的链接
        var ct2 = $('div.topic_wrap a').eq(i).attr('href').replace('/topic/', 'http://cnodejs.org/topic/');
        var buf2 = new Buffer(ct2 ,'binary');
        var href = iconv.decode(buf2 , 'utf-8'); 
        
        //获取帖子的title
        var ct1 = $('div.topic_wrap a').eq(i).html();
        var buf = new Buffer(ct1 ,'binary');
        var tit = iconv.decode(buf , 'utf-8'); 

        //获取帖子的最新时间
        var ct3 = $('div.last_time').eq(i).text();
        var buf3 = new Buffer(ct3 ,'binary');
        var tim = iconv.decode(buf3 , 'utf-8'); 

        savet(tit, href, tim, repl, head);
    }
}


function sp2(cont){
	//加载整个文档，也就是上面抓取到的数据
	$ = cheerio.load(cont);

	//用于拼接有用数据
    var data = '';

    //获取帖子的链接
    var n = $('a.dark').html();
    var buf1 = new Buffer(n ,'binary');
    var name = iconv.decode(buf1 , 'utf-8'); 
    
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

function sp3(cont){
    //加载整个文档，也就是上面抓取到的数据
    $ = cheerio.load(cont);

    //获取首页有多少个帖子
    var count = $('div.cell').length;

    //用于拼接有用数据
    var data = '';

    console.log('count %s', count);

    //循环获取并处理
    for(var i=0;i<count;i++){
        console.log('i : ' + i);
        var ct6 = $('div.cell div.user_avatar img').eq(i).attr('src');
        var buf6 = new Buffer(ct6 ,'binary');
        var head = iconv.decode(buf6 , 'utf-8'); 

        var ct5 = $('div.cell div.count a').eq(i).html() + '/' + $('div.cell div.count span').eq(i).html();
        var buf5 = new Buffer(ct5 ,'binary');
        var repl = iconv.decode(buf5 , 'utf-8'); 

        //获取帖子的链接
        var ct2 = $('div.cell div.topic_wrap a').eq(i).attr('href').replace('/topic/', 'http://cnodejs.org/topic/');
        var buf2 = new Buffer(ct2 ,'binary');
        var href = iconv.decode(buf2 , 'utf-8'); 
        
        //获取帖子的title
        var ct1 = $('div.cell div.topic_wrap a').eq(i).html();
        var buf = new Buffer(ct1 ,'binary');
        var tit = iconv.decode(buf , 'utf-8'); 

        //获取帖子的最新时间
        var ct3 = $('div.cell div.last_time').eq(i).text();
        var buf3 = new Buffer(ct3 ,'binary');
        var tim = iconv.decode(buf3 , 'utf-8'); 

        savec(tit, href, tim, repl, head);
    }
}

function sp4(cont){
    //加载整个文档，也就是上面抓取到的数据
    $ = cheerio.load(cont);

    //获取首页有多少个帖子
    var count = $('div.cell').length;

    //用于拼接有用数据
    var data = '';

    console.log('count %s', count);

    //循环获取并处理
    for(var i=0;i<count;i++){
        console.log('i : ' + i);

        var ct6 = $('div.cell div.user_avatar img').eq(i).attr('src');
        var buf6 = new Buffer(ct6 ,'binary');
        var head = iconv.decode(buf6 , 'utf-8'); 


        var ct5 = $('div.cell div.count a').eq(i).html() + '/' + $('div.cell div.count span').eq(i).html();
        var buf5 = new Buffer(ct5 ,'binary');
        var repl = iconv.decode(buf5 , 'utf-8'); 

        //获取帖子的链接
        var ct2 = $('div.cell div.topic_wrap a').eq(i).attr('href').replace('/topic/', 'http://cnodejs.org/topic/');
        var buf2 = new Buffer(ct2 ,'binary');
        var href = iconv.decode(buf2 , 'utf-8'); 
        
        //获取帖子的title
        var ct1 = $('div.cell div.topic_wrap a').eq(i).html();
        var buf = new Buffer(ct1 ,'binary');
        var tit = iconv.decode(buf , 'utf-8'); 

        //获取帖子的最新时间
        var ct3 = $('div.cell div.last_time').eq(i).text();
        var buf3 = new Buffer(ct3 ,'binary');
        var tim = iconv.decode(buf3 , 'utf-8'); 

        saver(tit, href, tim, repl, head);
    }
}


function savet(tit, href, tim, repl, head){
    var title = new Tits({title: tit, href: href, head: head, replys: repl, times: tim});

    title.save(function(err){
        if(err){
            console.log('error: %s', err);
        }

        console.log('title save success');
    });
}

function saveu(name, mono, join){
	var users = new Users({name: name, mono:mono, desc: '', join: join});

    users.save(function(err){
        if(err){
            console.log('error: %s', err);
        }

        console.log('repls save success');
    });
}

function savec(tit, href, tim, repl, head){
    var cells = new Cells({title: tit, href: href, head: head, replys: repl, times: tim});

    cells.save(function(err){
        if(err){
            console.log('error: %s', err);
        }

        console.log('cells save success');
    });
}

function saver(tit, href, tim, repl, head){
    var repls = new Repls({title: tit, href: href, head: head, replys: repl, times: tim});

    repls.save(function(err){
        if(err){
            console.log('error: %s', err);
        }

        console.log('repls save success');
    });
}

