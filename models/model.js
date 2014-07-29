 var mongoose = require('mongoose');

 var Applicant = mongoose.model("Applicant", {
 	name: String,
 	bio: String,
 	skills: String,
 	years: Number,
 	why: String
 })


 module.exports = {
 	Applicant: Applicant,
 }