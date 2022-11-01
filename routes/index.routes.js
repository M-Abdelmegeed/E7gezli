const express = require("express");
const registerUser = require("../controllers/registerUser");
const {testConnection} = require("../controllers/test");
const {userLogin} = require("../controllers/userLogin");
const {authenticateToken}=require("../controllers/userLogin");
const {getPosts} = require("../controllers/test");
// const userLogout = require("../controllers/userLogout");
const addMedicine = require("../controllers/addMedicine");
const getMedicine = require("../controllers/getMedicine");
const deleteMedicine = require("../controllers/deleteMedicine");
const router = express.Router();

router.post("/lala", testConnection);
router.post("/registration", registerUser);
router.post("/login", userLogin);
router.post("/posts",authenticateToken,getPosts);
// router.delete("/logout", userLogout);
router.post("/add-medicine",authenticateToken,addMedicine);
router.post("/get-medicines", authenticateToken,getMedicine);
router.post("/delete-medicine", authenticateToken,deleteMedicine);

module.exports=router;