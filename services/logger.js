const fs = require('fs');
const logger = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

const app = require('../app');

const development = process.env.NODE_ENV !== 'production';

if (development) {
  app.use(logger('dev'));
} else {
  const logDirectory = path.join(__dirname, 'logs');

  if (fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // Create a write stream that rotates daily
  const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  });

  app.use(logger('common', { stream: accessLogStream }));
}
