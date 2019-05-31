var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var HeadlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  summary:{
    type: String,
    required: false
  },
  url:{
    type: String,
    require: false
  },
  saved:{
    type: Boolean,
    default: false

  }
});

var Headline = mongoose.model("Headline",HeadlineSchema);
module.exports = Headline;