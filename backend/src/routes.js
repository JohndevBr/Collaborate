const express = require('express');
const CompanieController = require('./controllers/CompanieController');
const EmployeesController = require('./controllers/EmployeesController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Companies Routes
routes.get('/companies', CompanieController.index);
routes.post('/companies', CompanieController.create);

routes.get('/profile', ProfileController.index);

// Employees Routes
routes.get('/employees', EmployeesController.index); 
routes.post('/employees', EmployeesController.create); 
routes.delete('/employees/:id', EmployeesController.delete);

module.exports = routes;