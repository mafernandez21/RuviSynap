'use strict';

module.exports = function(app) {
	var logger =  require('../models/logger');
	var AuthController =  require('../controllers/AuthController');
	var RuviSynapController = require('../controllers/RuviSynapController');
	var ExporterController = require('../controllers/ExporterController');
	


	//SERVER LOG
	app.use('*',logger.log);	
	//RETURN SERVER STATUS
	app.route('/checkHealth').get(RuviSynapController.CheckHealth);
	//ALL CRITICAL ROUTES FOR AUTHENTICATION
	app.use('/auth/*',AuthController.Authorize);
	//GENERATE A NEW REGISTRATION CODE
	app.route('/auth/code').get(AuthController.GenRegCode);
	//SIGNUP EXPORTERS
	app.route('/signup').post(ExporterController.Signup);
	//ACTIVATE EXPORTERS TOKENS
	app.route('/ackToken').post(ExporterController.AckToken);
	//VALIDATE EXPORTERS TOKENS
	app.route('/validateToken').get(ExporterController.ValidateToken);
	//app.use('/auth/signup',db.connect);
	//app.use('/auth/signup',controller.genRegCode);
	//app.route('/auth/signup').post(controller.signup);










	app.route('/login').get(function(req,res){
		res.write('Login!');
		res.end();
	});




	//app.route('/auth/refreshToken').get(controller.refreshToken);
	
	/*app.route('/check')
	.get(vpnSE.check_server);

	app.route('/sessions')
	.get(vpnSE.sessions);

	app.route('/all_users')
	.get(vpnSE.all_users);

	app.route('/new_user')
	.post(vpnSE.new_user);

	app.route('/delete_user')
	.delete(vpnSE.delete_user);

	app.route('/user_details')
	.get(vpnSE.user_details);

	app.route('/generate_pass')
	.get(vpnSE.generate_pass);

	app.route('/vnc')
	.get(vpnSE.vnc);
	*/
};