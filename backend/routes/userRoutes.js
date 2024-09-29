const express = require('express');
const { getUsers, getUserByCedula, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getUsers);                    
router.get('/users/:cedula', getUserByCedula);     
router.post('/users', createUser);                 
router.put('/users/:cedula', updateUser);          
router.delete('/users/:cedula', deleteUser);       
router.post('/users/login', loginUser);            

module.exports = router;