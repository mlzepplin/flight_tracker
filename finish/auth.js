//THERE ARE VARIOUS STRATEGIE'S WHEN USING PASSPORT, LIKE FACEBOOK LOGIN/GITHUB LOGIN,ETC
//LOCAL STRATEGY MEANS WE'RE GONNA BE USING OUR OWN SERVER OR DATABASE
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	//done is another middleware
	function(username, password, done) {
		if (username === 'admin' && password === 'admin') {
			return done(null, {username: 'admin'});
		}

		return done(null, false);
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;