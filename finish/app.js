
/**
 * Module dependencies.
 */
module.exports = function(flights){
	var express = require('express');

	//SEE NOW THE INDEX.JS OF ROUTES MODULE REQUIRES flights input parameter
	var routes = require('./routes')(flights);
	var http = require('http');
	var path = require('path');
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
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

	//GET REQUEST FOR NORMAL JSON INFO OF A FLIGHT
	app.get('/flight/:number', routes.flight);

	//PUT REQUEST TO UPDATE THE ARRIVAL TIME OF FLIGHT
	app.put('/flight/:number/arrived', routes.arrived);

	//GET REQUEST TO SEE THE LIST OF ALL FLIGHTS
	app.get('/list', routes.list);

	return app;
}
