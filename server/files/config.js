//Special configuration file

module.exports = {
	mongooseUri: PROCESS.ENV.MONGOLAB_URI,
	
	sessionSecret: PROCESS.ENV.SESSION_SECRET
}