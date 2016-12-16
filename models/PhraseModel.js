var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PhraseSchema = new Schema({
	'Relation' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Relation'
	},
	'RelationName' : String, // redundant for find without join
	'Phrase' : String,
	'Anwser' : [Boolean],
	'Users' : [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Phrase', PhraseSchema);