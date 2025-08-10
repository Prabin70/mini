const express = require("express");
const {
  register,
  verifyThroughLink,
  login,
} = require("../controller/user.controller");

const router = express.Router();

router.post("/register", register);
router.get("/verify-through-link", verifyThroughLink);
router.post("/signin", login);

module.exports = router;
