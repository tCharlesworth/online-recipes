var mongoose = require('mongoose');
var Recipe = require('./recipe');

var schema = new mongoose.Schema({
	bookName: {type: String},
	recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
	sections: {type: [{type: String, unique: true, lowercase: true}], default: []},
	contributors: {type: Number, default: 1},
	image: {type: String, default: '/images/forkandknife.png'}
});


module.exports = mongoose.model('RecipeBook', schema);