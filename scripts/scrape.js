// //Require request and cherrio, making our scrapes possible.
// var request = require("request");
// var cheerio = require("cheerio");

// request('https://www.nytimes.com/', (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);

//     const balancedHeadline = $('.balancedHeadline');

//     console.log(balancedHeadline);
//   }
// })
var db = require ("../models");
var request = require("request");
var cheerio = require("cheerio");
var scrape = function (cb) {
    request("https://www.cnn.com/health", function(err, res, body) {
    var $ = cheerio.load(body);
    var articles = [];
    $("span.cd__headline-text").each(function(i, element){
        var head = $(this).text().trim();
        var sum = $(this).parent("a").attr('href').trim();
        console.log("head-line " + head);
        console.log("sum " + sum);
        if (head && sum) {
            // var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            // var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
            var dataToAdd = {
                headline: head,
                summary: sum,
            };

            console.log("hello");
            articles.push(dataToAdd);
            db.Headline.create(dataToAdd);
    
        }
       

    })
    cb(articles);
});
console.log("Made it here!")
};
module.exports = scrape;




