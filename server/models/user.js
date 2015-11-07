var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	contactEmail: {type: String, default: null},
	recipeBooks: {type: [mongoose.Schema.Types.ObjectId], default: []},
	recipeMail: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shareable'}], default: []},
	openRecipes: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}], default: []}
})

module.exports = mongoose.model('User', schema);