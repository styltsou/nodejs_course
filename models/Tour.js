const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name.'],
      unique: true,
      trim: true,
      minlength: [10, 'A tour name must have at least 10 characters.'],
      maxlength: [40, 'A tour must have less or equal than 40 characters.'],
      validate: [validator.isAlpha, 'Tour name must contain only letters.']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration.'],
      min: [1, 'A tour must last at least 1 day.']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size.'],
      min: [1, "A tour's max group size must be at least 1."]
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty.'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty can be either easy, or medium or difficult.'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1.0.'],
      max: [5, 'Ratings must be less or equal than 5.0.']
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
      min: [0, 'The number of ratings cannot be a negative number.']
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
      min: [1, 'A tours price cannot be less than 1.']
    },
    priceDiscount: {
      type: Number,
      min: [0, 'A price discount must be a positive number.'],
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message:
          'Discount price ({VALUE}) must be lower than the regular price.'
      }
    },
    summary: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description.']
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image.']
    },
    images: [String],
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    toJSON: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $nte: true } });
  next();
});

tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $nte: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
