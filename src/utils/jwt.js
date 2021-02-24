const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET = 'control_alumno';

exports.createToken = function (users) {
  let payload = {
    sub: users._id,
    name: users.name,
    user: users.user,
    rol: users.rol,
    courses: users.courses,
    iat: moment().unix(),
    exp: moment().day(10, 'days').unix(),
  };
  return jwt.encode(payload, SECRET);
};
