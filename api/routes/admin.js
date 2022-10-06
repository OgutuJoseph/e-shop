const express = require('express');
const router = express.Router();
const { register, login, getAllAdmins, getAdmin, updateAdmin, deleteAdmin } = require('../controllers/admin/admin.js');
const { verifyAdmin } = require('../utils/verifyToken.js');


/** Admin Auth */
router.post('/register', register);
router.post('/login', login);

/** Manage Admins */
router.get('/admins', verifyAdmin, getAllAdmins);
router.get('/admins/:_id', verifyAdmin, getAdmin);
router.put('/admins/:_id', verifyAdmin, updateAdmin);
router.delete('/admins/:_id', verifyAdmin, deleteAdmin);

module.exports =  router;