const client = require('../utils/mongoSetup');

require('dotenv').config();

exports.categories_list = async (req, res) => {
  await client.connect();
  const db = client.db('airbnb-db');
  db.collection('categories')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
};
