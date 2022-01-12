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

/**
 * @swagger
 * tags:
 *   name: Getir-Records
 *   description: Get records from db
 */

/**
 * @swagger
 *
 *  /records:
 *    post:
 *      summary: Get records
 *      description: Fetch records from mongo using various filters.
 *      tags: [Records]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                startDate:
 *                  type: string
 *                  description: startDate for createdAt field
 *                endDate:
 *                  type: string
 *                  description: endDate for createdAt field
 *                minCount:
 *                  type: integer
 *                  description: minimum value for totalCount
 *                maxCount:
 *                  type: integer
 *                  description: maxValue for totalCount
 *              example:
 *                startDate: "2016-01-26"
 *                endDate: "2018-02-02"
 *                minCount: 2700
 *                maxCount: 3000
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    value: 0
 *                  records:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/RecordResult'
 *                  msg:
 *                    type: string
 *                    enum: [Success, Failure]
 *                    default: Success
 *        "400":
 *          $ref: '#/components/responses/BadRequest'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */
