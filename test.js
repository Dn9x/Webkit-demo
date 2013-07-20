var spider = require('./spider');

var async = require('async');

var url = "http://cnodejs.org/?page=1";

async.series([
      function(next){
        spider.getu('xiuxu123', function(){});

        next();
      }, function(next){
        spider.gett(url, function(){});

        next();
      }, function(next){
        spider.getc('xiuxu123', function(){
        });

        next();
      }, function(next){
        spider.getr('xiuxu123', function(){
        });

        next();
      }], function(err, values) {
      console.log('async end : ' + values);
    });

/*spider.getus('xiuxu123', function(users){

	users.forEach(function(user, index){
  		var msg = user.name + "  " + user.mono;
  		
  		console.log(msg);
	});
  
});*/