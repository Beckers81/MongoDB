//Bring in our scrape script and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

//Bring in the Headline and Note mongoose models
var Headline = require("../models/Headline");

module.exports = {
    fetch: function(cb) {
      scrape (function(data) {
        var articles = data;
        for (var i=o; i < articles.length; i++) {
          articles[i].date = makeDate();
          articles[i].saved = false;
        }
        Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
          cb(err, docs);
        });
      });
    }

}