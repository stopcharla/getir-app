const pick = require('../utils/pick');
const success = require('../responses/success');
const catchAsync = require('../utils/catchAsync');
const { recordService } = require('../services');

const getRecords = catchAsync(async (req, res) => {
  const params = pick(req.body, ['startDate', 'endDate', 'minCount', 'maxCount']);
  const result = await recordService.queryRecords(params);
  res.send(success({ records: [...result] }));
});

module.exports = {
  getRecords,
};
