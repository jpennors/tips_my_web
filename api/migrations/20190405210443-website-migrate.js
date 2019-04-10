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

	var table_name = 'website'

	var sql = "\
		CREATE TABLE website (\
		id int(11) NOT NULL AUTO_INCREMENT,\
		name varchar(100) NOT NULL,\
		description varchar(200) NOT NULL,\
		url varchar(500) NOT NULL,\
		image varchar(500) NOT NULL,\
		language varchar(10) NOT NULL,\
		score int(11),\
		created_at timestamp DEFAULT CURRENT_TIMESTAMP,\
		updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
		deleted_at timestamp NULL DEFAULT NULL,\
		visitors int(11),\
		PRIMARY KEY (id)\
		) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1";

	return db.runSql(sql);

};

exports.down = function(db) {

	return db.dropTable('website');

};

exports._meta = {
  "version": 1
};
