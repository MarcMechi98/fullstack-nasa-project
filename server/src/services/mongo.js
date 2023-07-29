const mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error('MONGO_URL is not defined in the .env file.');
  process.exit(1);
}

mongoose.connection.once('open', () => {
  console.log('MongoDB connection has been established!')
});

mongoose.connection.on('error', (err) => {
  console.error(err)
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}