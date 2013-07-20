var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

require('./tits');
require('./users');
require('./cells');
require('./repls');

exports.Tits = mongoose.model('tits');
exports.Users = mongoose.model('users');
exports.Cells = mongoose.model('cells');
exports.Repls = mongoose.model('repls');
