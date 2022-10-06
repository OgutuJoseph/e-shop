// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const  { registerUser, loginUser, updateUser, deleteUser, getUser } = require('../controllers/user.js');
const { verifyUser } = require('../utils/verifyToken.js');

/** Auth */
router.post('/register', registerUser);
router.post('/login', loginUser);

/** Manage Self */
router.get('/:id', verifyUser, getUser)
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);

module.exports =  router;