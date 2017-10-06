#!/usr/bin/env node
/*
* global require 
* __dirname
*/
//global.hubList = ["operaciones","servers","agencias", "ruviag"];

var PORT = 3003;
//********  Dependencies  **************
var bodyParser = require("body-parser");

//*******  Include Functions  *****


//********  Create Server ***********

var express = require("express"),
	app = express();

//var router = express.Router();

//var hub;


//*****   Start Server:  **********
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  /*console.log("AUTHENTICATOR PARA");*/
  
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT); 
console.log("Listening on "+ PORT  + "...");

//*********************************

var routes = require('./api/routes/routes');
routes(app);





/*
var port = 3003;

var express = require("express"),
	app = express(),
	router = express.Router(),
	bodyParser  = require("body-parser"),
	methodOverride = require("method-override");

var auth=require()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.listen(port, function() {
	console.log('AUTHENTICATOR INITIALIZED ON PORT : ' + port);
});

	

	router.get('/mysql',function(req,res){
		res.writeHead(200, {"Content-Type": "text/html; charset=utf-8",
							'Access-Control-Allow-Origin': '*'});
        con.connect(function(err) {
  			console.log("Connected!");
  			con.query("call actualizaciones.asp_dame_actualizacion(1);", function (err, result) {
    		console.log("Result: \n" + JSON.stringify(result));
    		res.write("Result: \n" + JSON.stringify(result));
	 		res.end();
	 		});
		});
        
	});

	router.get('/', function(req, res) {
	 	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8",
							'Access-Control-Allow-Origin': '*'});
        res.write("<h1>BACKEND CONSOLIDADO DE OPERACIONES RUVIAG</h1>");
	 	res.end()
	});
*/