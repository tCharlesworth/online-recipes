var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {type: String},
	recipeType: {type: String},
	ingredients: {type: [String]},
	instructions: {type: [String]}
});

module.exports = mongoose.model('Recipe', schema);