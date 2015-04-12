//var mongoose = require('mongoose');
//var exports.Schema = mongoose.Schema;

module.exports.model = {

	this.landSchema = new Schema({
		commercialName: String,
		size: Number,
		updatedDescription: Date
	});
	this.ExSchema = new Schema ({ 
		username: String,
		email: String
	});

	this.LandModel = mongoose.model('Land', landSchema, 'usercollection');
	this.ExModel = mongoose.model('ExModel', ExSchema, 'usercollection'); 

};

