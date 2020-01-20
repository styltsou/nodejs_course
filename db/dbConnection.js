const mongoose = require('mongoose');

const development = process.env.NODE_ENV !== 'production';

const DB_CONNECTION_URI = development
  ? process.env.MONGO_CONNECTION_URI_LOCAL
  : process.env.MONGO_CONNECTION_URI.replace(
      '<PASSWORD>',
      process.env.MONGO_PASSWORD
    );

mongoose
  .connect(DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB successfully.'));

mongoose.connection.on('error', () => {
  console.log('Error while trying to connect to MongoDB');
});
