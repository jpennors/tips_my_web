var Website = require('../models/website.model');

exports.index = function(req, res){

	Website.getAll(function(error, results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	});
}

exports.show = function(req, res){
	
	Website.findById(req.params.id, function(error,results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}

exports.post = function(req, res){

	data = new Website(req.body);
	data.save(function(error, results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}

exports.update = function(req, res){

	data = new Website(req.body);
	data.update(req.params.id, function(error, results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}

exports.destroy = function(req, res){

	console.log("ici")
	Website.destroy(req.params.id, function(error, results){
		console.log(results)
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}