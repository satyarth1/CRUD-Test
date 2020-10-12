/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  serverSelectionTimeoutMS: (10 * 1000),
})
  .then(() => console.info('Mongo connected.'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
