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

	var table_name = 'website_tag'

	var sql = "\
		CREATE TABLE website_tag (\
		website_id int(11) NOT NULL,\
		tag_id int(11) NOT NULL,\
		PRIMARY KEY (website_id, tag_id),\
		FOREIGN KEY (website_id) REFERENCES website(id),\
		FOREIGN KEY (tag_id) REFERENCES tag(id)\
		) ENGINE=MyISAM";

	return db.runSql(sql);

};

exports.down = function(db) {

	return db.dropTable('website_tag');

};

exports._meta = {
  "version": 1
};
