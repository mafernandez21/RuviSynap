'use strict';
var db = require ('../models/db');
var moment = require('moment');

module.exports={
/**
* NEW EXPORTER SIGNUP. RETURNS A VALID TOKEN FOR EXPORTER AND SERVER INTERACTION
*/
	Signup: function(ip,host,key,code,callback){
		var sql='CALL ruvisynap.rssp_ExporterSignup(\''+ip+'\',\''+host+'\',\''+key+'\',\''+code+'\');';
		console.log(sql);
		db.query(sql,function (err,results) {
			/*var token={
					token:0,
					expToken:moment(new Date('2016-08-01 00:00:00')).format("YYYY-MM-DD HH:mm:ss"),
					refreshToken:0,
					expRefreshToken:moment(new Date('2016-08-01 00:00:00')).format("YYYY-MM-DD HH:mm:ss")
				};*/
			var token=null;
			console.log(results);
			if(!err && results){
	  			token={
					Token:results[0][0].Token, 
					ExpTime:moment(new Date(results[0][0].ExpTime)).format("YYYY-MM-DD HH:mm:ss"),
					RefreshToken:results[0][0].RefreshToken,
					ExpRefreshTime:moment(new Date(results[0][0].ExpRefreshTime)).format("YYYY-MM-DD HH:mm:ss")
				};
	  		}
	  		if(err || !token){
 				err=new Error('Invalid Registration Code or RuviSynap Server Unavailable');
			}
			console.log(JSON.stringify(token));
	  		callback(err,token);
	  	});
	},

	AbortSignup: function(ip,host,key,callback){
		var sql='CALL ruvisynap.rssp_ExporterAbortSignup(\''+ip+'\',\''+host+'\',\''+key+'\');';
		db.query(sql,function (err) {
	  		callback(err);
	  	});
	},

	AckToken: function(ip,hostname,key,callback){
		var sql='CALL ruvisynap.rssp_ExporterAckToken(\''+ip+'\',\''+hostname+'\',\''+key+'\');';
		db.query(sql,function (err,results) {
			if(err){
	  			err=new Error('Error while activating token or RuviSynap Server Unavailable');
			}
	  		callback(err);
	  	});
	},

	ValidateToken: function(token,callback){
  		var tokenStatus=-1;
  		var sql='';
  		if(token){
			//sql='CALL ruvisynap.rssp_ExporterValidateToken(\''+token.Token+'\',\''+moment(new Date(token.ExpTime)).format("YYYY-MM-DD HH:mm:ss")+'\',\''+token.RefreshToken+'\',\''+moment(new Date(token.ExpRefreshTime)).format("YYYY-MM-DD HH:mm:ss")+'\');';
			sql='CALL ruvisynap.rssp_ExporterValidateToken(\''+token.Token+'\');';
			
			db.query(sql,function (err,results) {
				//console.error(err);
				//console.log(results[0]);
				if(results[0]!=''){
					tokenStatus=results[0][0].tokenStatus;
				}
				//console.log(tokenStatus);
				if(err || results[0]==''){
		  			err=new Error('Error while validating token or RuviSynap Server Unavailable');
				}
		  		callback(err,tokenStatus);
		  	});
		}else{
			callback(new Error('NULL TOKEN'),tokenStatus);
  		}
	}
}