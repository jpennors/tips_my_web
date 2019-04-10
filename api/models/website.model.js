module.exports = (sequelize, Sequelize) => {
	const Website = sequelize.define('website', {
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
		description : {
			type: Sequelize.STRING,
			allowNull:false,
			validate : {
				len:[0,200],
			},
		},
		url : {
			type: Sequelize.STRING,
			allowNull:false,
			validate : {
				len: [0,50],
				isUrl: true,
			},
		},
		image : {
			type: Sequelize.STRING,
		},
		language : {
			type: Sequelize.STRING,
			allowNull:false,
			validate : {
				len: [2,4],
			},
		},
		score : {
			type: Sequelize.INTEGER,
			validate : {
				isInt: true,
				min: 0,
				max: 100,
			},
		},
		visitors : {
			type: Sequelize.INTEGER,
			validate : {
				isInt: true,
				min: 0,
			},
		},
		// Timestamps
		deleted_at : Sequelize.DATE,
	})

	return Website;
}