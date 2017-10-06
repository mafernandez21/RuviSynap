'use strict';
var ErrorController = require ('../controllers/ErrorController');
var ExporterModel = require('../models/Exporter');
var http = require("http");

function sendHttpRequest(options,callback){
	var resStatusCode=404;
	var req = http.request(options, function (err,res) {
		var chunks = [];
		if(!err){
			res.on("data", function (chunk) {
	    		chunks.push(chunk);
	  		});

	  		res.on("end", function () {
	   			var body = Buffer.concat(chunks);
	  		});
	  	}
	});

	req.on('response',function(res){
		callback(null,res.statusCode);			
	});

	req.on('error', function(err) {
   		callback(err,resStatusCode);
	});

	req.end();
}

function sendToken(ip,key,token,callback){
	var options = {
		"method": "POST",
		"hostname": ip,
		"port": "3004",
		"path": "/setTokens",
		"headers": {
			"key": key,
		    "token": token.Token,
		    "expToken": token.ExpTime,
		    "refreshToken": token.RefreshToken,
		    "expRefreshToken": token.ExpRefreshTime,
		    "cache-control": "no-cache"
		}
	};
	//console.log("sendTokens");
	sendHttpRequest(options,function(err,statusCode){
		//console.log(statusCode);
		callback(err,statusCode);
	});
}

module.exports={
	Signup: function(req, res){	
		if (!req.headers.ip || 
			!req.headers.host ||
			!req.headers.key || 
			!req.headers.code) return res.sendStatus(400);
		ExporterModel.Signup(
			req.headers.ip,
			req.headers.host,
			req.headers.key,
			req.headers.code,
			function(err,token){
				if(!err){
					//console.log(JSON.stringify(token));
					sendToken(req.headers.ip,req.headers.key,token,function(err,statusCode){
						if(!err){
							res.sendStatus(statusCode);
						}else{
							res.sendStatus(404);
							ExporterModel.AbortSignup(
								req.headers.ip,
								req.headers.host,
								req.headers.key,
								function(err){
									console.error(err);
								}
							);
						}
					});
				}else{
					ErrorController.errorHandler(err,req,res);
				}
			}
		);
	},

	AckToken: function(req, res){
		if (!req.headers.ip || 
			!req.headers.hostname ||
			!req.headers.key) return res.sendStatus(400);
		ExporterModel.AckTokens(
			req.headers.ip,
			req.headers.hostname,
			req.headers.key,
			function(err){
				if(!err){
					console.log("Received headers \n"+JSON.stringify(req.headers));
					console.log("Token Activated\n");
					res.sendStatus(200);
				}else{
					ErrorController.errorHandler(err,req,res);
				}
			}
		);
	},

	ValidateToken: function(req, res){
		var token=null;
		if (!req.headers.token 
			//|| 
			//!req.headers.exptime ||
			//!req.headers.refreshtoken || 
			//!req.headers.exprefreshtime
			) return res.sendStatus(400);
		token={
			Token:req.headers.token,
			//ExpTime:req.headers.exptime,
			//RefreshToken:req.headers.refreshtoken,
			//ExpRefreshTime:req.headers.exprefreshtime
			};
			//console.log(JSON.stringify(token));
		ExporterModel.ValidateToken(
			token,
			function(err,tokenStatus){
				if(!err){
					console.log("Received token \n"+JSON.stringify(token));
					console.log("Token Status -> "+tokenStatus);
					//res.sendStatus(200);
					var resTokenStatus={
						token:token.Token,
						tokenStatus:tokenStatus
					}
					res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
					res.write(JSON.stringify(resTokenStatus));
					res.end();
				}else{
					ErrorController.errorHandler(err,req,res);
				}
			}
		);
	}
}	