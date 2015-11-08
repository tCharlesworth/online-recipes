/* global __dirname */
console.log("Starting server...");
//Dependencies
console.log('   importing modules...');
var express = require('express');
var config = require('./files/config');
var mongoose = require('mongoose');
var mongoData = require('./controllers/mongoDataCtrl.js');
var bodyparser = require('body-parser');
var passport = require('passport');
var passportCtrl = require('./controllers/passportCtrl.js');
var session = require('express-session');


console.log('   setting middleware...');
var app = express();
//Middleware
app.use(express.static('./public'));
app.use(bodyparser.json());
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

//Policies
var isAuthed = function (req, res, next) {
	if(!req.isAuthenticated()) {
		return res.sendStatus(401);
	}
	return next();
}


console.log('   setting endpoints...');
//Endpoints

//Mongo Endpoints	
app.post('/recipeBooks', isAuthed, mongoData.createRecipeBook);
app.post('/recipes', isAuthed, mongoData.addRecipe);
app.post('/share', isAuthed, mongoData.shareRecipe);
app.post('/share/accept', isAuthed, mongoData.acceptShare);
app.post('/openRecipe/:id', isAuthed, mongoData.openRecipe);

app.put('/recipeBooks/newSection', isAuthed, mongoData.addSection);

app.get('/recipeBooks/:bookId', isAuthed, mongoData.getRecipeBook);
app.get('/recipeBooks', isAuthed, mongoData.getRecipeBooks);
app.get('/recipes/:id', isAuthed, mongoData.getRecipe)
app.get('/share', isAuthed, mongoData.getRecipeMail);
app.get('/openRecipes', isAuthed, mongoData.getOpenRecipes);

app.delete('/recipeBooks/:bookId', isAuthed, mongoData.deleteRecipeBook);
app.delete('/share/reject/:id', isAuthed, mongoData.deleteShareable);
app.delete('/openRecipes/remove/:id', isAuthed, mongoData.removeOpenRecipe);

app.put('/recipesDelete', isAuthed, mongoData.deleteRecipe);
app.put('/recipe/:id', isAuthed, mongoData.updateRecipe);

//Passport Endpoints
app.post('/localSignup', 	passportCtrl.localSignup);
app.post('/localLogin', 	passport.authenticate('local'), passportCtrl.login);
app.get('/user', passportCtrl.getUser);
app.get('/logout', passportCtrl.logout);

console.log("   connecting to mongo database...");
mongoose.connect(config.mongooseUri);



app.listen(process.env.PORT || 80, function () {
	console.log("Server started, listening on port 3000.");
});