const { isDateValid, isCountValid } = require('../recordMiddleware');

describe('checking the records middleware methods', () => {
  test('dates should be valid', () => {
    const next = (args) => {
      expect(args).toEqual();
    };
    isDateValid({ body: { startDate: '2016-02-03', endDate: '2017-02-03' } }, {}, next);
  });

  test('dates should be inValid', () => {
    const next = (args) => {
      expect(args).toBeInstanceOf(Error);
    };
    isDateValid({ body: { startDate: '2017-02-03', endDate: '2016-02-03' } }, {}, next);
  });

  test('counts should be valid', () => {
    const next = (args) => {
      expect(args).toEqual();
    };
    isCountValid({ body: { minCount: 1000, maxCount: 2000 } }, {}, next);
  });

  test('counts should be inValid', () => {
    const next = (args) => {
      expect(args).toBeInstanceOf(Error);
    };
    isCountValid({ body: { minCount: 2000, maxCount: 1000 } }, {}, next);
  });
});