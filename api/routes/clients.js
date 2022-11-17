const express = require('express');
const router = express.Router();
const clientsController = require('../controller/clients');
const usersController = require('../controller/users');
const auth = require('../controller/users');

router.get('/', usersController.authorization, clientsController.landingPage);

router.get('/signup', usersController.authorization, clientsController.signUpPage);

router.get('/dashboard', usersController.authorization,clientsController.dashboardPage);

router.get('/profile', clientsController.profilePage);

router.get('/habit/:id', usersController.authorization, usersController.habitCheck, clientsController.habitPage);

router.post('/auth', usersController.authorization, usersController.returnGlobal);    
router.get('/test', clientsController.testPage);

router.get('/login', usersController.authorization, clientsController.loginPage);

module.exports = router;
