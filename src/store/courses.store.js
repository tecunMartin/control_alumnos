const model = require('../model/courses.model');
const modelUser = require('../model/user.model');

async function list(teacher) {
  return await model.find({ teacher });
}

async function findOne(name) {
  return await model.findOne({ name });
}

async function create(body) {
  const newModel = new model(body);
  return await newModel.save();
}

async function update(id, body) {
  return await model.findByIdAndUpdate(id, body, { new: true });
}

async function findById(id, curso) {
  return await modelUser.findByIdAndUpdate(id, { $push: { courses: curso } }, { new: true });
}

async function findOneCurseOwn(id) {
  return await model.findOne({ _id: id });
}

async function findAllCurso(id, rol) {
  return await modelUser.find({ courses: id, rol });
}

async function updateAll(id, cursos) {
  return await modelUser.findByIdAndUpdate(id, { $set: { courses: cursos } });
}

async function removeCourse(id) {
  return await model.findByIdAndDelete(id);
}

module.exports = {
  list,
  findOne,
  create,
  update,
  findById,
  findOneCurseOwn,
  findAllCurso,
  updateAll,
  removeCourse,
};
