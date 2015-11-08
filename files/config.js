//Special configuration file

module.exports = {
	mongooseUri: process.env.MONGOLAB_URI,
	
	sessionSecret: process.env.SESSION_SECRET
}