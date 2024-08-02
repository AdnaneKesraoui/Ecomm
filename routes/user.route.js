const router = require('express').Router();
const {verifyToken, verifyAdmin} = require("../middleware/verifyToken.js");
const {updateUser, deleteUser, getAdmin, getAllUsers, getUserStats, getUser} = require("../controllers/user.controller.js");


router.get("/get-users", (req, res) => {
  res.send("users have been fetched");
});

router.put("/update/:id", verifyToken, updateUser);

router.delete("/delete/:id", verifyAdmin, deleteUser);

router.get("/get-admin/:id", verifyAdmin, getAdmin);

router.get("/get-user/:id", verifyAdmin, getUser);

router.get("/", verifyToken, getAllUsers);

router.get("/stats", verifyAdmin, getUserStats);

module.exports = router;

//access it via : localhost:5000/api/v1/users/get-users  