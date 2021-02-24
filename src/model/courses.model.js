const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = Schema({
  name: String,
  teacher: { type: mongoose.Schema.ObjectId, ref: 'Users' },
});

module.exports = mongoose.model('Courses', Course);
