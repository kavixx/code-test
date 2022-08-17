const mongoose = require('mongoose');

const connectDB = url => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongo db success');
});
module.exports = connectDB;
