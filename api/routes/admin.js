const express = require('express');
const router = express.Router();
const { register, login, getAllAdmins, getAdmin, updateAdmin, deleteAdmin } = require('../controllers/admin/admin.js');
const { verifyAdminToken } = require('../utils/verifyToken.js');


/** Admin Auth */
router.post('/register', register);
router.post('/login', login);

/** Manage Admins */
router.get('/', verifyAdminToken, getAllAdmins);
router.get('/:id', verifyAdminToken, getAdmin);
router.put('/edit/:id', verifyAdminToken, updateAdmin);
router.delete('/:id', verifyAdminToken, deleteAdmin);

module.exports =  router;