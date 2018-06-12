var mongoose = require('mongoose');

//URL CONNECTION TO MONGODB VIA MONGOLAB (mlab.com) DIRECTLY
mongoose.connect('mongodb://rishabh:rishabh0@ds257470.mlab.com:57470/flight_tracker_0');

module.exports = mongoose.connection;