const router = require("express").Router();
const { checkToken } = require("../../auth/token-validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user-controller");


router.post("/login", login);



module.exports = router;