var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplsSchema = new Schema({
  title: { type: String },
  href: { type: String},
  head: {type: String},
  replys: { type: String, default: '1'  },
  times: { type: String },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('repls', ReplsSchema);
