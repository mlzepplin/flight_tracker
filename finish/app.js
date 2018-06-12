
/**
 * Module dependencies.
 */
module.exports = function(flights,db){
	var express = require('express');
	//BEFORE WE'RE ABLE TO STORE THE SESSION IN MONGO, WE'LL STORE IT INTO EXPRESS
	//HENCE WE WILL BE PASSING IT 
	var MongoStore = require('connect-mongo')(express);

	//SEE NOW THE INDEX.JS OF ROUTES MODULE REQUIRES flights input parameter
	var routes = require('./routes')(flights,db);
	var http = require('http');
	var path = require('path');
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	//MIDDLEWARE COOKIEPARSER, YOU HAVE TO USE IT EVEN IF DONING SESSION ALONE
	//AS SESSION IS ALSO BASICALLY A COOKIE
	//AND BEFORE WE USE SESSION, WE HAVE TO USE COOKIEPARSER
	app.use(express.cookieParser());
	app.use(express.session({
		secret : 'random secret key',
		store  :  new MongoStore({
			mongooseConnection : db
		}) 
	}));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	//ME: THE ADDED MIDDLEWARE
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Flight Tracker');
		next();
	});


	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	//WHAT TO DO FOR FOLLOWING REQUESTS
	//GET REQUEST FOR NORMAL JSON INFO OF A FLIGHT
	app.get('/flight/:number', routes.flight);

	//PUT REQUEST TO UPDATE THE ARRIVAL TIME OF FLIGHT
	app.put('/flight/:number/arrived', routes.arrived);

	//GET REQUEST TO SEE THE LIST OF ALL FLIGHTS
	app.get('/list', routes.list);

	//GET REQUEST FOR ARRIVALS PAGE
	app.get('/arrivals', routes.arrivals);

	return app;
}
