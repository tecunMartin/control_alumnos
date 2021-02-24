const express = require('express');
const router = express.Router();
const { agregar, agregarCursos, listartCursos, updateMe, deleteMe, listPDF } = require('../controllers/students.controller');
const { verifyAuth } = require('../utils/verify-auth');

router.get('/cursos', verifyAuth, listartCursos);
router.get('/pdf', verifyAuth, listPDF);
router.post('/create', agregar);
router.post('/cursos/agregar', verifyAuth, agregarCursos);
router.put('/updateMe', verifyAuth, updateMe);
router.delete('/deleteMe', verifyAuth, deleteMe);
/* router.post('/');
router.get('/', getStudents); */

module.exports = router;
