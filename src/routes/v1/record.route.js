const express = require('express');
const validate = require('../../middleware/validate');
const recordMiddleware = require('../../middleware/recordMiddleware');
const recordController = require('../../controllers/record.controller');

const router = express.Router();

const middlewares = [
  validate(recordMiddleware.getRecords),
  recordMiddleware.isDateValid,
  recordMiddleware.isCountValid,
];

router.route('/').post(middlewares, recordController.getRecords);

module.exports = router;
