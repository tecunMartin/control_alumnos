const courses = require('./courses.router');
const alumnos = require('./students.router');
const auth = require('./auth.network');

const routes = (app) => {
  app.use('/cursos', courses);
  app.use('/auth', auth);
  app.use('/alumnos', alumnos);
};

module.exports = routes;
