var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {type: String},
	recipeType: {type: String},
	ingredients: {type: [{type: String}], default: []},
	instructions: {type: [{type: String}], default: []}
});

module.exports = mongoose.model('Recipe', schema);