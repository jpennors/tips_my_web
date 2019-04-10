var Tag = require('../models/tag.model');

exports.index = function(req, res){

	Tag.getAll(function(error, results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	});
}

exports.show = function(req, res){
	
	Tag.findById(req.params.id, function(error,results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}

exports.post = function(req, res){

	data = new Tag(req.body);
	data.save(function(error, results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}

exports.update = function(req, res){

	data = new Tag(req.body);
	data.update(req.params.id, function(error, results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}

exports.destroy = function(req, res){

	Tag.destroy(req.params.id, function(error, results){
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		}
	})
}