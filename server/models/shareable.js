var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	recipeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
	fromUser: {type: String},
	message: {type: String},
	isRecipe: {type: Boolean},
	makeCopy: {type: Boolean, default: true}
});

module.exports = mongoose.model('Shareable', schema);