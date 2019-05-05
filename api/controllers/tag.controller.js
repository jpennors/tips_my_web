// var Tag = require('../models/tag.model');

// exports.index = function(req, res){

// 	Tag.getAll(function(error, results){
// 		if (error) {
// 			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
// 		} else {
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		}
// 	});
// }

// exports.show = function(req, res){
	
// 	Tag.findById(req.params.id, function(error,results){
// 		if (error) {
// 			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
// 		} else {
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		}
// 	})
// }

// exports.post = function(req, res){

// 	data = new Tag(req.body);
// 	data.save(function(error, results){
// 		if (error) {
// 			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
// 		} else {
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		}
// 	})
// }

// exports.update = function(req, res){

// 	data = new Tag(req.body);
// 	data.update(req.params.id, function(error, results){
// 		if (error) {
// 			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
// 		} else {
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		}
// 	})
// }

// exports.destroy = function(req, res){

// 	Tag.destroy(req.params.id, function(error, results){
// 		if (error) {
// 			res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
// 		} else {
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		}
// 	})
// }


const db = require('../config/db.config.js');
const Tag = db.tag;

// Post a Customer
exports.save = (req, res) => {	
	// Save to MySQL database
	Tag.create({  
	  name: req.body.name,
	}).then(tag => {		
		// Send created customer to client
		res.send(tag);
	}).catch(error => {
		console.log(error['name']);
		if (error['name'] == 'SequelizeUniqueConstraintError') {
			res.status(409).send(JSON.stringify({"error" : "Contrainte d'unicité non respectée"}));
		}
	});
};
 
// FETCH all Customers
exports.index = (req, res) => {
	Tag.findAll().then(tags => {
	  // Send all customers to Client
	  res.send(tags);
	});
};

// Find a Customer by Id
exports.show = (req, res) => {	
	Tag.findByPk(req.params.id).then(tag => {
		res.send(tag);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	const id = req.params.id;
	Tag.update( { name: req.body.name }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a tag with id = " + id);
				   });
};
 
// Delete a Customer by Id
exports.destroy = (req, res) => {
	const id = req.params.id;
	Tag.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a tag with id = ' + id);
	});
};