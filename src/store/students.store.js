const model = require('../model/user.model');

async function findUser(id) {
  return await model.findById(id).populate('courses');
}

async function findByID(id) {
  return await model.findById(id);
}

async function findUpdate(id, courses) {
  return await model.findByIdAndUpdate(id, { $push: { courses } }, { new: true });
}

async function findAndUpdate(id, body) {
  return await model.findByIdAndUpdate(id, body, { new: true });
}

async function removeUser(id) {
  return await model.findByIdAndDelete(id);
}

async function findUserOne(id) {
  return await model.find({ _id: id });
}

module.exports = {
  findUser,
  findByID,
  findUpdate,
  findAndUpdate,
  removeUser,
  findUserOne,
};
