var models = require('./db'),
  Tits = models.Tits;

var title = new Tits({title: 'this is second', href: 'href', replys: 0, times: '23'});

title.save(function(err){
	if(err){
		console.log('error: %s', err);
	}

	console.log('save success');
});