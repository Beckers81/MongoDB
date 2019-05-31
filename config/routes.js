var db = require("../models");
var cheerio = require("cheerio");
var axios = require("axios");
// var scrape = require("../scripts/scrape");
module.exports = function(app){
  app.get("/",function(req,res){
    db.Headline.find({}).then(function(dbHeadlines){
      res.render("home", {article: dbHeadlines})
    })
    // res.render("home")
  })
  app.get("/scrape", function(req,res){
    // scrape(function(data){
    //   console.log(data);
    //   res.json(data);
    // })
    
      var results = [];

      axios.get('https://www.cnn.com/health').then(function (response) {

          var $ = cheerio.load(response.data);

          $('span.cd__headline-text').each(function (i, element) {

              var article = {};

              article.headline = $(this).text().trim();
              // article.link = $(this).find('a.js_entry-link').attr('href');
              // article.summary = $(this).parent("a").attr('href').trim();
              
              results.push(article);

              //push scraped article to mongoDB (works) 
              db.Headline.create(article);
          });

      }).catch(function (err) {
          res.json(err);
      });

  
    
  })
};