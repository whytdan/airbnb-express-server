const client = require('../utils/mongoSetup');

require('dotenv').config();

exports.homes_list = async (req, res) => {
  const query = req.query;
  const page = query['_page'] ? query['_page'] - 1 : 0;
  const resultFilterSchema = {};
  const filterParams = [
    'flexibleCancellation',
    'instanceBooking',
    'housingType_like',
    'price_gte',
    'price_lte',
  ];

  Object.entries(query).map(([key, value]) => {
    if (filterParams.includes(key)) {
      switch (key) {
        case 'flexibleCancellation':
          resultFilterSchema[key] = JSON.parse(value);
          break;
        case 'instanceBooking':
          resultFilterSchema[key] = JSON.parse(value);
          break;
        case 'housingType_like': {
          if (Array.isArray(value)) {
            resultFilterSchema['housingType'] = { $in: value };
          } else {
            resultFilterSchema['housingType'] = { $in: [value] };
          }
          break;
        }
        case 'price_gte':
          resultFilterSchema['price'] = { $gte: +value };
          break;
        case 'price_lte':
          resultFilterSchema['price'] = { $lte: +value };
          break;
        default:
          break;
      }
    }
  });

  // !order is important: skip -> limit
  const defaultAggregationArr = [{ $skip: page * 5 }, { $limit: 5 }];
  const filterAggregationArr = [{ $match: { ...resultFilterSchema } }];
  const finalAggregationArr = filterAggregationArr.concat(
    defaultAggregationArr
  );

  await client.connect();
  const db = client.db(process.env.DB_NAME);
  db.collection('homes')
    .aggregate(finalAggregationArr)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
};
