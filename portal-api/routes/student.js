const student = require('../controllers/student');
const express = require('express');
const portal = express.Router();
const checkJwt = require('../middleware/auth');

portal.get('/students', checkJwt, student.list);
portal.get('/student/:id', checkJwt, student.get);
portal.post('/student', checkJwt, student.create);
portal.put('/student/:id', checkJwt, student.update);
portal.delete('/student/:id', checkJwt, student.delete);

module.exports = portal;
