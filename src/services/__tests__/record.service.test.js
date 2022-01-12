const mockingoose = require('mockingoose');
const Records = require('../../models/record.model');
const { queryRecords } = require('../record.service');

describe('record service test cases', () => {
  test('Check if query is correctly generated', async () => {
    const startDate = '2016-02-03'; const endDate = '2017-02-03'; const minCount = 1000; const
      maxCount = 2000;
    const aggregaterQuery = (query) => {
      // eslint-disable-next-line no-underscore-dangle
      expect(query._pipeline).toEqual([{ $project: { key: 1, createdAt: 1, totalCount: { $sum: '$counts' } } }, { $match: { $and: [{ createdAt: { $gt: new Date(startDate) } }, { createdAt: { $lt: new Date(endDate) } }, { totalCount: { $gt: minCount } }, { totalCount: { $lt: maxCount } }] } }]);
      return [];
    };

    mockingoose(Records).toReturn(aggregaterQuery, 'aggregate');

    await queryRecords({
      startDate, endDate, minCount, maxCount,
    });
  });
});
