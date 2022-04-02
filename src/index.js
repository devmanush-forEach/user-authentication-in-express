const express = require("express");

const { signup, login } = require("./router/auth.routes");

const { body, validationResults } = require("express-validator");

const app = express();
const userRoutes = require("./router/user.routes");

app.use(express.json());

app.post("/login",
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("Please enter a valid password"),
    login);


app.post("/signup",
    body("name").isLength({ min: 3 }).withMessage("Please enter a valid name"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("Please enter a valid password"),
    signup)

app.use("/user", userRoutes)

module.exports = app;