const express = require('express');
const server = express();
const userRouter = require('./users/users-router')
// const { logger } = require("./middleware/middleware")

server.use(express.json());
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
