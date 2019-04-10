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
		},

		// Timestamps
		deleted_at : Sequelize.DATE,
	})

	return Tag;
}