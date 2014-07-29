var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var model = require('./models/model.js');

mongoose.connect('mongodb://localhost/daggerInc');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	model.Applicant.find(function(err, users) {
		if(err) {
			console.log("wtf")
		}else{
			res.render('applicants', {
				data: users
			})
		}
	})
});

app.get("/success", function(req, res) {
	res.render("success")
})

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	// res.send('Success!');
	var newApplicant = new model.Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	})

	newApplicant.save();
	res.redirect('success');
	// console.log("req.body:", req.body)
});

app.post("/delete", function(req, res) {
	console.log("req.body:", req.body);
	var toDelete = model.Applicant.remove({_id: req.body._id}, function(err, user) {
		if(err) {
			console.log("delete failed")
		}else{
			return console.log("user:", user);
		}
	})
	res.redirect("applicants");
})

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
