'use strict';

function errorHandler(err,req,res){
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

module.exports={
	CheckHealth: function(req,res){
		var health={
			statusCode:200,
		};
		//FUNCTION CHECK STATUS

		console.log("CHECK HEALTH ("+JSON.stringify(health)+")");
		res.writeHead(health.statusCode, {"Content-Type": "application/json; charset=utf-8"});
		res.write(JSON.stringify(health));
		res.end();
	}
}