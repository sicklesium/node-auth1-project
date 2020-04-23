require('dotenv').config();
const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const restricted = require('../middleware/restricted-middleware.js');

const usersRouter = require("../routes/users/users-router.js");
const regRouter = require("../routes/auth/register-router.js");
const loginRouter = require("../routes/auth/login-router.js");
const logoutRouter = require("../routes/auth/logout-router.js")

const server = express();

const sessionConfig = {
    name: 'oatmeal',
    secret: process.env.MYSECRET,
    cookie: {
        maxAge: 3600 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore(
        {
            knex: require("../data/dbConfig.js"),
            tablename: "sessions",
            sidfieldname: "sid",
            createtable: true,
            clearInterval: 3600 * 1000
        }
    )
}

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/register", regRouter);
server.use("/api/login", loginRouter);
server.use("/api/logout", logoutRouter);

server.get("/", (req, res) => {
    res.json({ message: "The API is working!" });
});

module.exports = server;