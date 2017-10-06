'use strict';
//var ErrorModel = require('../models/Error');

module.exports={
	errorHandler: function(err,req,res){
		if(err){
			console.error("Error Handler, handle this error\n"+JSON.stringify(err.stack));
			if(res){
				res.sendStatus(503);
				res.end();
			}else{
				console.error(err);
			}
		}
	}
}