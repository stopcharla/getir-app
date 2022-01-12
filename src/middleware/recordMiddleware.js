const httpStatus = require('http-status');
const Joi = require('joi');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const fetchRecords = {
  body: Joi.object().keys({
    startDate: Joi.date(),
    endDate: Joi.date().min(Joi.ref('startDate')),
    minCount: Joi.number().integer(),
    maxCount: Joi.number().integer().min(Joi.ref('minCount')),
  }),
};

const isDateValid = (req, res, next) => {
  const params = pick(req.body, ['startDate', 'endDate']);
  if (params.startDate
    && params.endDate
    && new Date(params.endDate) < new Date(params.startDate)) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'endDate is greater than startDate'));
  }
  return next();
};

const isCountValid = (req, res, next) => {
  const params = pick(req.body, ['minCount', 'maxCount']);
  if (params.minCount !== undefined
    && params.maxCount !== undefined
    && params.maxCount < params.minCount) {
    return next(new ApiError(httpStatus.BAD_REQUEST, 'maxCount is greater than minCount'));
  }
  return next();
};

module.exports = {
  fetchRecords,
  isDateValid,
  isCountValid,
};
