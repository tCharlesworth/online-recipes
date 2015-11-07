var bcrypt = require('bcryptjs');
var mongoAuth = require('./mongoAuthCtrl');
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Setup local strategy
passport.use(new LocalStrategy(function(username, password, done) {
	//Query mongo here
	User.findOne({username: username}, function(err, user) {
		if(err) {
			return done(err);
		}

		//User does not exist
		if(!user) {
			return done(null, false, {message: 'Incorrect Username'});
		}
		
		//Invalid password
		bcrypt.compare(password, user.password, function(err, result) {
			if(result) {
				//passwords matched!
				return done(null, user);
			} else {
				return done(null, false, {message: 'Incorrect Password'});
			}
		});
	});
}));


//Setup Serialization
passport.serializeUser(function(user, done) {
	var newUser = {
		_id: user._id,
		uname: user.username
	}
	done(null, newUser);
})

passport.deserializeUser(function(obj, done) {
	done(null, obj);
})

module.exports = {
	localSignup: function(req, res) {
		console.log("RECEIVED", req.body);
		mongoAuth.createUser(req, res, req.body);
	},
	
	login: function(req, res) {
		console.log("This only gets called with successful login");
		res.status(200).send();
	},
	
	getUser: function(req, res) {
		res.json(req.user);
	},
	
	logout: function(req, res) {
		req.logout();
				
		res.send();
	}
	
}