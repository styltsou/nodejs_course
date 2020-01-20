const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Import Routers
const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');

const app = express();

app.use(express.json());

// Set security HTTPS headers
app.use(helmet());

// Parse cookies on each request
app.use(cookieParser());

// Data validation against MongoDB Injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Mount Routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
