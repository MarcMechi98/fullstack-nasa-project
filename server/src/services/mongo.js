const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://marcedumechi:obFbfvD4vaJWr9aM@cluster0.yyjiygm.mongodb.net/nasa?retryWrites=true&w=majority';

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