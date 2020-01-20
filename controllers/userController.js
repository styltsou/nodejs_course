const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res, next) => {
  console.log('user created');
});

const getAllUsers = catchAsync(async (req, res, next) => {
  console.log('hello');
});

const getUser = catchAsync(async (req, res, next) => {
  console.log('object');
});

const updateUser = catchAsync(async (req, res, next) => {
  console.log('object');
});

const deleteUser = catchAsync(async (req, res, next) => {
  console.log('object');
});

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
