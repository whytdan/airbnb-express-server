const { MongoClient } = require('mongodb');

require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@mongodb:${DB_PORT}/${DB_NAME}`;

const client = new MongoClient(uri);

module.exports = client;
