/*global require __dirname*/
var PORT = 6001;

//********  Dependencies  **************
var bodyParser = require("body-parser");

//*******  Include Functions  *****


//********  Create Server ***********

var express = require("express"), app = express();
//var router = express.Router();


//*****   Start Server:  **********
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT); 
console.log("Listening on "+PORT+"...");

//*********************************

var routes = require('./routes/routes');
routes(app);