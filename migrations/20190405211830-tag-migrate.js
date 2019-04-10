'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {

	var table_name = 'tag'

	var sql = "\
		CREATE TABLE tag (\
		id int(11) NOT NULL AUTO_INCREMENT,\
		name varchar(100) NOT NULL,\
		PRIMARY KEY (id)\
		) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1";

	return db.runSql(sql);

};

exports.down = function(db) {

	return db.dropTable('tag');

};

exports._meta = {
  "version": 1
};
