const express = require("express");
const server = express.Router();
const { User } = require("../db.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require ('jsonwebtoken')
const { HOSTFRONT, secret } = process.env;

server.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, message) => {
        if(user) {
          const token = jwt.sign( {user}, secret)
            res.status(200).json({ user, token })
        }else{
          res.status(402).send(message)
        }
    }) 
    (req, res, next)
})

server.post("/logout", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  req.logout();
  res.status(200).send('usted esta deslogueado');  
})



module.exports = server;
