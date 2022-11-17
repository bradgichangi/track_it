const express = require('express');
const router = express.Router();
const usersController = require('../controller/users')

//router.get('/admin', usersController.currentUser);
router.get('/', usersController.displayAll);

router.get('/:id',  usersController.authorization, 
                    usersController.getUser);
router.get('/:id/habits', usersController.getHabits);
router.post('/passwordcheck', usersController.checkPassword);
router.post('/login', usersController.login);
router.post('/signup', usersController.signup);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.destroy);



module.exports = router;
