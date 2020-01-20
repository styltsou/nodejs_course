const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'You must provide a name.'],
    minlength: [3, 'Name must be at least 3 characters long.'],
    maxlength: [20, 'Name must be at max 20 characters.']
  },
  email: {
    type: String,
    required: [true, 'You must provide an email.'],
    validate: [validator.isEmail, 'You must provide a valid email']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
