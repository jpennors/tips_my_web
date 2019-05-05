module.exports = (sequelize, Sequelize) => {
	const Tag = sequelize.define('tag', {
		id: {
        	type: Sequelize.INTEGER,
        	primaryKey: true,
        	autoIncrement: true,
      	},
		name : {
			type: Sequelize.STRING,
			allowNull:false,
			validate : {
				len: [0,30],
			},
			unique: {
				args: true,
				msg: 'Mail already in use!'
			}
		},
		parent_id : {
			type: Sequelize.INTEGER,
		},

		// Timestamps
		deleted_at : Sequelize.DATE,
	})

	return Tag;
}