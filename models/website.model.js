/**
*	Definition of Website Model
*
*/

var website_schema = require('../schemas/website.schema.js');
var _ = require('lodash');

var Website = function(data){
	this.data = this.sanitize(data);
}


/**
*	Get every website
*
*/
Website.getAll = function(callback){
	
	connection.query('SELECT * FROM website', function(error, rows, fields){
		if (error) 
			callback(error);
			
		websites = [];
		for (var i = rows.length - 1; i >= 0; i--) {
			websites.push(new Website(rows[i]))
		}
		return callback(null, websites)
	})

}


/**
*	Find a website by id
*
*/
Website.findById = function(id, callback){

	connection.query("SELECT * FROM website WHERE id=" + id, function(error, rows){
		if (error) {
			callback(error);
		}
		website = null;
		for (var i = rows.length - 1; i >= 0; i--) {
			website = new Website(rows[i])
		}
		callback(null, website);
	})
		
}


/**
*	Store a website into the database
*
*/
Website.prototype.save = function(callback){
	
	connection.query('INSERT INTO website SET ?', this.data, function (error, results) {
		if (error) 
			callback(error);
  		callback(null, results.insertId);
	});
}


/**
*	Edit a website
*
*/
Website.prototype.update = function(id, callback){
	this.set("id", id)
	sql = "UPDATE website SET ? WHERE id=" + id;
	connection.query(sql, this.data, function(error, results){
		if (error) {
			callback(error)
		}
		callback(null, "Ok")
	})
}


/**
*	Delete a website
*
*/
Website.destroy =  function(id, callback){
	sql = "DELETE FROM website WHERE id=" + id;
	connection.query(sql, function(error, results){
		if (error) {
			callback(error)
		}
		callback(null, "Deleted");
	})
}


Website.prototype.data = {}

/**
*	Get value of an attribute
*
*/
Website.prototype.get = function(name){
	return this.data[name];
}


/**
*	Set value to an attribute
*
*/
Website.prototype.set = function(name, value){
	this.data[name] = value;
}


/**
*
*
*/
Website.prototype.sanitize = function(data){

	// data = data || {};
	data = data || {};
    schema = website_schema.website;
	return _.pick(_.defaults(data, schema), _.keys(schema));

}


/**
*	
*
*/
// To DO Get Affluence d'un site par id, appel API


/**
*	Calculate scoring of a website
*
*/
Website.prototype.getScore = function(tags){
	
}


module.exports = Website