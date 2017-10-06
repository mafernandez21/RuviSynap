module.exports={
	log: function(err, req, res, next){
		//console.log(req.query.debuglevel);
		//var verbose=-1;
		var verbose=req.query.debuglevel;
		
		if(!req.query.debuglevel) verbose='0';
		
		//console.log(err);
		switch(verbose){
			case 'min':
				console.log(new Date(), req.method, req.originalUrl, JSON.stringify(req.headers));
				break;
			case 'med':
				console.log(new Date(), "Medio");
				break;
			case 'max':
				console.log(new Date(), "Todo");
				if(err)console.erro(err);
				break;
			case 'err':
				if(err)console.erro(err);
				break;
			default:
				break;
		}
		next();
	}
}