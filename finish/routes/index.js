
/*
 * GET home page.
 */

var flights = require('../data');

var flight = require('../flight');

for(var number in flights) {
	//ME: YOU PROVIDE IN JSON DATA, THIS RETURNS A FLIGHT OBJECT
	//USING THE FACTORY (PARAMETERISED CONSTRUCTOR) IN THE flight->index.js!!
	flights[number] = flight(flights[number]);
}

exports.flight = function(req, res){
	var number = req.param('number');

	if (typeof flights[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
		res.json(flights[number].getInformation());
	}
};