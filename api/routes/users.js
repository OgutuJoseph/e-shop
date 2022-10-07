// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const  { registerUser, loginUser, getAllUsers, getUser, updateUser, deleteUser  } = require('../controllers/user.js');
const { verifyUserToken, verifyAdminToken } = require('../utils/verifyToken.js');

/** Auth */
router.post('/register', registerUser);
router.post('/login', loginUser);

/** Manage Self */
router.get('/:id', verifyUserToken, getUser)
router.put('/edit/:id', verifyUserToken, updateUser);
router.delete('/:id', verifyUserToken, deleteUser);

/** Admin Mange users */
router.get('/', verifyAdminToken, getAllUsers);

module.exports =  router;