const db = require('../config/db.config.js');
const Website = db.website;
const WebsiteTag = db.website_tag;
const Tag = db.tag;
const Sequelize = db.Sequelize;

// Post a Website
exports.save = (req, res) => {	
	// Save to MySQL database
	Website.create({  
	  name: req.body.name,
	  description: req.body.description,
	  url: req.body.url,
	  language: req.body.language
	}).then(website => {	
		for (var i = req.body.tags.length - 1; i >= 0; i--) {
			console.log(req.body.tags[i])
			Tag.findByPk(req.body.tags[i]).then(tag => {
				website.setSubjects(tag);
				// To DO Create WebsiteTag
			})	
		}
		res.send(website);
	});
};
 
// FETCH all Websites
exports.index = (req, res) => {
	Website.findAll({
		include: [{
			model:Tag, as: 'Subjects',
			attributes : ['id', 'name'],
			through: {
				attributes: ['website_id', 'tag_id'],
			}
		  }]
	}).then(websites => {
	  res.send(websites);
	});
};

// Find a Website by Id
exports.show = (req, res) => {	
	Website.findByPk(req.params.id, {
		include: [{
			model:Tag, as: 'Subjects',
			attributes : ['id', 'name'],
			through: {
				attributes: [],
			}
		  }]
	}).then(website => {
		res.send(website);
	})
};
 
// Update a Website
exports.update = (req, res) => {
	const id = req.params.id;
	Website.update( { name: req.body.name, description: req.body.description }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a website with id = " + id);
				   });
};
 
// Delete a Website by Id
exports.destroy = (req, res) => {
	const id = req.params.id;
	Website.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a website with id = ' + id);
	});
}


	// Search a website
exports.search = (req, res) => {
	console.log(req.body)
	tags = req.body.tags

	// Website.findAll({
	// 	include: [{
	// 		model: Tag,
	// 	}]
	// })
	// for (var i = tags.length - 1; i >= 0; i--) {
	// 	Website.findAll({
	// 		where: {
	// 			// tag_id: parseInt(tags[i])

	// 		}
	// 	}).then(website_tags =>{
	// 		console.log(website_tags)
	// 		// for (var j = website_tags.length -1; j >= 0; j--){
	// 		// 	console.log(website_tags[j])
	// 		// 	console.log(website_tags[j].dataValues.website_id)
	// 		// }
			
	// 	})
		
	// }
	const Op = Sequelize.Op;
	Website.findAll({
    include: [{
			model:WebsiteTag,
			// attributes : ['id', 'name'],
			// through: {
				// attributes: ['website_id', 'tag_id'],
			// },
			where: { id: {
				[Op.or]: [1, 4]
				}
			}
    }]
	}).then((res) => {
		console.log(res)
	})
};
