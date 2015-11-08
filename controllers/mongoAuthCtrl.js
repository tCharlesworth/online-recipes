var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = {
	
	createUser: function(req, res, user) {
		//Encrypt password
		bcrypt.genSalt(12, function(err, salt) {
			if(err) {
				handleError(err);
			} else {
				bcrypt.hash(user.password, salt, function(err2, hash) {
					if(err2) {
						handleError(err2);
					}else {
						user.password = hash;
						//Send to database
						User.create(user, function(err3, result) {
							if(err3) {
								console.error(err3);
								res.status(400).json(err);
							} else {
								//lets auto-login?
								
								
								
								res.status(200).json(result);
							}
						});
					}
				});
			}
		});
	}
	
}

var handleError = function(err, req, res) {
	console.log("ERROR!");
	console.error("Mongo Error: ",err);
	res.status(400).send(err);
}