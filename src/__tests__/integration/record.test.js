const request = require('supertest');
const httpStatus = require('http-status');
const mockingoose = require('mockingoose');
const Records = require('../../models/record.model');
const app = require('../../app');

const records = [
  {
    _id: '5ee21588e07f053f990cec7d',
    key: 'ibfRLaFT',
    createdAt: '2016-12-25T16:43:27.909Z',
    totalCount: 2892,
  },
  {
    _id: '5ee21587e07f053f990cebb5',
    key: 'pxClAvll',
    createdAt: '2016-12-19T10:00:40.050Z',
    totalCount: 2772,
  },
];

describe('Records', () => {
  describe('POST /v1/records', () => {
    test('should return 200 and successfully create fetch data from DB', async () => {
      const startDate = '2016-02-03';
      const endDate = '2018-02-03';

      mockingoose(Records).toReturn(records, 'aggregate');

      const res = await request(app)
        .post('/v1/records')
        .send({
          startDate,
          endDate,
          minCount: 1,
          maxCount: 3000,
        })
        .expect(httpStatus.OK);
      expect(res.body).toEqual({
        code: 0,
        msg: 'Success',
        records: expect.any(Array),
      });
    });

    it.each([{ minCount: 1, maxCount: 2 }])('should return 200 and fetch all data if request startDate is missing', async (params) => {
      const res = await request(app)
        .post('/v1/records')
        .send({
          endDate: params.endDate,
          startDate: params.startDate,
          minCount: params.minCount,
          maxCount: params.maxCount,
        })
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        code: 0,
        msg: 'Success',
        records: expect.any(Array),
      });
    });

    it('should return 400 when startDate is greater than endDate', async () => {
      const endDate = '2016-02-03';
      const startDate = '2018-02-03';

      const res = await request(app)
        .post('/v1/records')
        .send({
          startDate,
          endDate,
          minCount: 1,
          maxCount: 2,
        })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({
        code: 400,
        msg: 'endDate is greater than startDate',
      });
    });

    it('should return 400 when minCount is greater than maxCount', async () => {
      const startDate = '2016-02-03';
      const endDate = '2018-02-03';

      const res = await request(app)
        .post('/v1/records')
        .send({
          startDate,
          endDate,
          minCount: 2,
          maxCount: 1,
        })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({
        code: 400,
        msg: 'maxCount is greater than minCount',
      });
    });
  });
});
