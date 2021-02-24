const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = Schema({
  name: String,
  user: String,
  password: String,
  rol: String,
  courses: [{ type: mongoose.Schema.ObjectId, ref: 'Courses' }],
});

module.exports = mongoose.model('Users', user);
