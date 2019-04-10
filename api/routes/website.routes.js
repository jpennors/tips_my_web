var express = require('express');
var router = express.Router();

var website_controller = require('../controllers/website.controller.js');

/* GET website listing */
router.get('/', website_controller.index);

/* GET a website by id */
router.get('/:id', website_controller.show);

/* POST a website */
router.post('/', website_controller.post);

/* PUT update a website listing */
router.put('/:id', website_controller.update);

/* DELETE a website */
router.delete('/:id', website_controller.destroy);


module.exports = router;