const express = require("express");
const { registerAdmin, loginAdmin } = require("../controller/admin.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAuthorized = require("../middleware/isAuthorized");

const adminRouter = express.Router();

adminRouter.post(
  "/register",
  isAuthenticated,
  isAuthorized(["admin"]),
  registerAdmin
);
adminRouter.post("/login", loginAdmin);

module.exports = adminRouter;
