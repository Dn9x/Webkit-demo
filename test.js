
var spider = require('./spider');
var util = require('util');

spider.getu('jiyinyiyong', function(){
spider.getus('jiyinyiyong', function(users){
  users.forEach(function(user, index){
      console.log(user.head);
  });
});
});


