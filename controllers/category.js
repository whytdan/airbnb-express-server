const client = require('../utils/mongoSetup');

require('dotenv').config();

exports.categories_list = async (req, res) => {
  const query = req.query;
  const page = (+query['_page'] ?? 1) - 1;
  const limit = +query['_limit'];

  const resultFilterSchema = {};
  const filterParams = [
    'flexibleCancellation',
    'instanceBooking',
    'housingType',
    'price_gte',
    'price_lte',
  ];

  Object.entries(query).map(([key, value]) => {
    if (filterParams.includes(key)) {
      resultFilterSchema[key] = JSON.parse(value);
    }
  });

  await client.connect();
  const db = client.db(process.env.DB_NAME);
  db.collection('homes')
    .find({
      ...resultFilterSchema,
    })
    .skip(page * 5)
    .limit(limit)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
};
