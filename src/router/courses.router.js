const express = require('express');
const router = express.Router();

/* Importaciones personales */
const { getCourses, createCourses, updateCourses, removeCourses } = require('../controllers/courses.controlller');
const { verifyAuth } = require('../utils/verify-auth');

/* Listar cursos */
router.get('/', verifyAuth, getCourses);
router.post('/create', verifyAuth, createCourses);
router.put('/update/:idCurso', verifyAuth, updateCourses);
router.delete('/delete/:idCurso', verifyAuth, removeCourses);

module.exports = router;
