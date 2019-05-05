module.exports = (sequelize, Sequelize) => {
	const WebsiteTag = sequelize.define('website_tag', {
		tag_id: {
        	type: Sequelize.INTEGER,
        	primaryKey: true,
        },
        website_id: {
        	type: Sequelize.INTEGER,
        	primaryKey: true,
      	},
        belonging : {
			type: Sequelize.INTEGER,
			validate : {
				isInt: true,
				min: 0,
				max: 100,
			},
		},
	})

	return WebsiteTag;
}