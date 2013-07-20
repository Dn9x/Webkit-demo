var spider = require('./spider');
var util = require('util');

spider.getus('xiuxu123', function(users){
  users.forEach(function(user, index){
      var msg = user.name + "  " + user.mono;

      console.log(msg);
  });

  spider.getcs(function(cells){
  	cells.forEach(function(cell, index){
      var msg = util.format('<div class="list5"><a href="%s" target="_blank">%s</a></div>', cell.href, cell.title);

      console.log(msg);
  	});
  });
  
});
