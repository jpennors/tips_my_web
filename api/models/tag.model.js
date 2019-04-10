/**
*	Definition of Tag Model
*
*/

var tag_schema = require('../schemas/tag.schema.js');
var _ = require('lodash');

var Tag = function(data){
	this.data = this.sanitize(data);
}


Tag.prototype.data = {}


/**
*	Get every tags
*
*/
Tag.getAll = function(callback){
	
	connection.query('SELECT * FROM tag', function(error, rows, fields){
		if (error) 
			callback(error);
			
		tags = [];
		for (var i = rows.length - 1; i >= 0; i--) {
			tags.push(new Tag(rows[i]))
		}
		return callback(null, tags)
	})

}


/**
*	Find a tag by id
*
*/
Tag.findById = function(id, callback){

	connection.query("SELECT * FROM tag WHERE id=" + id, function(error, rows){
		if (error) {
			callback(error);
		}
		tag = null;
		for (var i = rows.length - 1; i >= 0; i--) {
			tag = new Tag(rows[i])
		}
		callback(null, tag);
	})
		
}


/**
*	Store a tag into the database
*
*/
Tag.prototype.save = function(callback){
	
	connection.query('INSERT INTO tag SET ?', this.data, function (error, results) {
		if (error) 
			callback(error);
  		callback(null, results.insertId);
	});
}


/**
*	Edit a tag
*
*/
Tag.prototype.update = function(id, callback){
	this.set("id", id)
	sql = "UPDATE tag SET ? WHERE id=" + id;
	connection.query(sql, this.data, function(error, results){
		if (error) {
			callback(error)
		}
		callback(null, "Ok")
	})
}


/**
*	Delete a tag
*
*/
Tag.destroy =  function(id, callback){
	sql = "DELETE FROM tag WHERE id=" + id;
	connection.query(sql, function(error, results){
		if (error) {
			callback(error)
		}
		callback(null, "Deleted");
	})
}


/**
*	Get value of an attribute
*
*/
Tag.prototype.get = function(name){
	return this.data[name];
}


/**
*	Set value to an attribute
*
*/
Tag.prototype.set = function(name, value){
	this.data[name] = value;
}


/**
*
*
*/
Tag.prototype.sanitize = function(data){

	data = data || {};
    schema = tag_schema.tag;
	return _.pick(_.defaults(data, schema), _.keys(schema));

}


module.exports = Tag