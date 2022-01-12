const { Record } = require('../models');

/**
 * Query for records
 * @param {Object} filter - record filters
 * @param {string} params.startDate - String Date in a YYYY-MM-DD format.
 * @param {string} params.endDate - String Date in a YYYY-MM-DD format.
 * @param {number} params.minCount - minCount for totalCount
 * @param {number} params.maxCount - maxCount for totalCount
 * @returns {Promise<Array>}
 */
const queryRecords = async (params) => {
  const filters = [];
  const query = [
    {
      $project: {
        key: 1,
        createdAt: 1,
        totalCount: { $sum: '$counts' },
      },
    },
  ];

  if (params.startDate) filters.push({ createdAt: { $gt: new Date(params.startDate) } });
  if (params.endDate) filters.push({ createdAt: { $lt: new Date(params.endDate) } });
  if (params.minCount) filters.push({ totalCount: { $gt: params.minCount } });
  if (params.maxCount) filters.push({ totalCount: { $lt: params.maxCount } });
  if (filters.length) {
    query.push({
      $match: {
        $and: filters,
      },
    });
  }

  const records = await Record.aggregate(query);
  return records;
};

module.exports = {
  queryRecords,
};
