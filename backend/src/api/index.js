const express = require('express')
const imageController = require('./image.controller')
const router = express.Router();



router.route('/').get(imageController.getAllImages).post(imageController.uploadImage);
router.delete('/:id',imageController.removeImage)

module.exports = router;