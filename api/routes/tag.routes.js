var express = require('express');
var router = express.Router();

var tag_controller = require('../controllers/tag.controller.js');

/* GET tag listing */
router.get('/', tag_controller.index);

/* GET a tag by id */
router.get('/:id', tag_controller.show);

/* POST a tag */
router.post('/', tag_controller.save);

/* PUT update a tag */
router.put('/:id', tag_controller.update);

/* DELETE a tag */
router.delete('/:id', tag_controller.destroy);


module.exports = router;