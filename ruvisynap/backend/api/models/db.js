'use strict';

var dbConfig = require('../config/dbConfig');
var mysql = require("mysql");
var connection;

//CREATE NEW CONNECTION TO MYSQL DB
function newConnect(){
	return mysql.createConnection({
		host: dbConfig.host,
		user: dbConfig.user,
		password: dbConfig.password,
		port: dbConfig.port,
		database: dbConfig.database
	});	
}

//CONNECTION TO MYSQL DB
function connect(connection, req, res){
	connection=newConnect();
	connection.connect(function(err) {
  		if (err) {
    		console.error('ERROR AL CONECTAR CON BD: ' + err.stack);
    		return;
  		}
   		console.log('CONECTADO CON ID ' + connection.threadId);
	});
}


module.exports={
	connect: function(req, res){
		return connect(connection);
	},

	query: function (sql,callback){
		connection=newConnect();
		connection.query(sql,function (err, results, fields) {
		    connection.end();
		  	//connection.destroy();
		  	//console.error(err);
		  	if(!err){
		   		callback(null,results);
		  	}else{
				callback(err,results);
		  	}

	  	});
	}/*,

	nombre: function(err,param,callback){
	
	}
*/
}