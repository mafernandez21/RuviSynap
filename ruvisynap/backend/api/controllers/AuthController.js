'use strict';
var AuthModel = require('../models/Auth');
var ErrorController = require ('../controllers/ErrorController');

module.exports={

	Authorize: function(req, res, next){
		if (!req.headers.token) return res.sendStatus(401);
		AuthModel.Authorize(req.headers.token,function(err,authorized){
			if(!err){
				if(authorized==true){
					//console.log("Token "+req.headers.token+ ",authorized");
					next();
				}else{
					res.redirect('/login');
					res.end();
				}
			}
			ErrorController.errorHandler(err,req,res);
		});
	},

	GenRegCode: function(req, res){
		var expTime=0;
		if (!req.headers.expiration) return res.sendStatus(400);
		expTime=req.headers.expiration;
		AuthModel.GenRegCode(expTime,function(err,code){
			if(!err){
				res.send(code);
				res.end();
			}
			ErrorController.errorHandler(err,req,res);
		});
	}
}
