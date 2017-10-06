'use strict';

var db = require ('../models/db');
var moment = require('moment');


module.exports={
/**
* AUTHORIZE A SESSION TOKEN TO GET ACCESS FOR AUTHENTICATOR SERVER FUNCTIONS
*/
	Authorize: function (token,callback){
		if(token){
			var sql='CALL ruvisynap.rssp_AuthorizeSessionToken(\''+token+'\');';
			db.query(sql,function (err,results) {
				var auth=false;
				if(!err){
					if(results[0][0].authorized=='1'){
		  				auth=true;
					}
		  		}
		  		callback(err,auth);
		  	});
		};
	},

/**
* RETURNS ONE REGISTRATION CODE AND ITS EXPIRATION TIME, FOR A NEW EXPORTER REGISTRATION.
*/
	GenRegCode: function (expTime,callback){
		var sql='CALL ruvisynap.rssp_GenRegCode('+expTime+');';
		db.query(sql,function (err,results) {
			var code={
				code:'0',
				expTime:moment(new Date('2016-08-01 00:00:00')).format("YYYY-MM-DD HH:mm:ss")
			};
	  		if(!err){
	  			code={
	  				code:results[0][0].code,
	  				expTime:moment(new Date(results[0][0].expTime)).format("YYYY-MM-DD HH:mm:ss"),
	  			};
			}
		  	callback(err,code);
	  	});
	}
}
