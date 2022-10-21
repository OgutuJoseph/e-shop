const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/auth/auth.js");
const { getAllAdmins, getAdmin, updateAdmin, deleteAdmin } = require("../controllers/admin.js");
const { verifyAdminToken } = require("../utils/verifyToken.js");

/** Admin Auth */
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

/** Manage Admins */
router.get("/", verifyAdminToken, getAllAdmins);
router.get("/:id", verifyAdminToken, getAdmin);
router.put("/edit/:id", verifyAdminToken, updateAdmin);
router.delete("/:id", verifyAdminToken, deleteAdmin);

module.exports = router;
