const { registrar } = require('../controllers/auth.controller');
const { findByID, findUpdate, findUser, findAndUpdate, removeUser, findUserOne } = require('../store/students.store');
const RESPONSE = require('../utils/response');
const { pdf } = require('../utils/pdf/coding-pdf/pdf.generator');
const { findOne } = require('../model/user.model');

function agregar(req, res) {
  registrar(req, res, 'ROL_ALUMNO');
}

function agregarCursos(req, res) {
  const { curso } = req.body;

  if (req.user.rol !== 'ROL_ALUMNO') {
    return RESPONSE.error(req, res, 'Eres profesor no pueder agragar cursos a alumnos.', 404);
  }

  findByID(req.user.sub)
    .then((usuarioEncontrada) => {
      if (usuarioEncontrada.courses.length > 2) {
        return RESPONSE.error(req, res, 'Ya no puedes asignar más cursos.', 404);
      } else if (usuarioEncontrada.courses.find((element) => element == curso)) {
        return RESPONSE.error(req, res, 'Este curso ya existe.', 500);
      } else {
        findUpdate(req.user.sub, curso).then((cursos) => {
          console.log(cursos);
          console.log(req.user.sub);
          !cursos ? RESPONSE.error(req, res, cursos, 500) : RESPONSE.success(req, res, cursos, 200);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

function listartCursos(req, res) {
  if (req.user.rol !== 'ROL_ALUMNO') {
    return RESPONSE.error(req, res, 'No eres alumno para ver tus cursos.', 401);
  }

  findUser(req.user.sub)
    .then((usuarioEncontrada) => {
      !usuarioEncontrada
        ? RESPONSE.error(req, res, 'Usuario no encontrado', 500)
        : RESPONSE.success(req, res, usuarioEncontrada.courses, 200);
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

function updateMe(req, res) {
  if (req.user.rol !== 'ROL_ALUMNO') {
    return RESPONSE.error(req, res, 'No eres alumno para modificar este perfil.', 401);
  }

  if (req.user.sub) {
    const parametros = req.body;
    delete user;
    delete password;
    delete _id;
    delete rol;
    findAndUpdate(req.user.sub, parametros)
      .then((usuarioModificado) => {
        !usuarioModificado ? RESPONSE.error(req, res, 'No viene usuario', 500) : RESPONSE.success(req, res, usuarioModificado, 200);
      })
      .catch((err) => {
        console.log(err);
        return RESPONSE.error(req, res, 'Error interno', 500);
      });
  } else {
    return RESPONSE.error(req, res, 'No puedes editar este perfil.', 500);
  }
}

function deleteMe(req, res) {
  if (req.user.sub) {
    removeUser(req.user.sub)
      .then((eliminado) => {
        !eliminado ? RESPONSE.error(req, res, 'Error al eliminar', 500) : RESPONSE.success(req, res, 'Usuario eliminado!!!', 200);
      })
      .catch((err) => {
        console.log(err);
        return RESPONSE.error(req, res, 'Error interno', 500);
      });
  } else {
    return RESPONSE.error(req, res, 'No puedes eliminar este usuario.');
  }
}

function listPDF(req, res) {
  if (req.user.rol !== 'ROL_ALUMNO') {
    return RESPONSE.error(req, res, 'No eres alumno para ver tus cursos.', 401);
  }

  findUser(req.user.sub)
    .then((usuarioEncontrada) => {
      if (usuarioEncontrada) {
        pdf(usuarioEncontrada.courses, req.user);
        return RESPONSE.success(req, res, 'PDF creado con exito.', 200);
      } else {
        return RESPONSE.error(req, res, 'NO SE PUEDE CREAR EL PDF', 404);
      }
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

module.exports = {
  agregar,
  agregarCursos,
  listartCursos,
  updateMe,
  deleteMe,
  listPDF,
};
