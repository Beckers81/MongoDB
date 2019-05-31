//Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");


//Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

//Incorporate our Express app
var app = express();

require("./config/routes")(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//set up an Express Router
var router = express.Router();

//Set our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Have every request go through our router middleware
app.use(router);

//If deployed use the deployed database otherwise use the local mongo headlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose to our database
mongoose.connect(db, { useNewUrlParser: true }, function (error){
  //Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  //or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

//Listen on the port
app.listen(PORT, function () {
  console.log("Listening on port:" + PORT);
});