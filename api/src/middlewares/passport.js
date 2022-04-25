var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
// const passportJWT = require("passport-jwt");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy
const { User } = require("../db.js");
const  jwt = require('jsonwebtoken')

const {secret} = process.env;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : secret
    },
    function (jwtPayload, next) {
        User.findByPk( jwtPayload.id || jwtPayload.user.id )
        .then(user => {
            next(null, user.id);
        })
        .catch(err => {
            next(err);
        });
    }
))

passport.serializeUser((user, next) => next(null, user));

passport.deserializeUser((user, next) => {
  next(null, user);
})

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      async (email, password, next) => {
        await User.findOne({
          where: {
            email: email,
          },
        })
          .then((user) => {
            if (!user || !user.correctPassword(password)) {
              next(null, false, { message: "Correo o contraseña incorrectos" });
            } else { 
            next(null, user, { message: "Login Successfull" });
            }
          })
          .catch((err) => {
            next(err);
          });
      }
    )
  );

  passport.use(
    new BearerStrategy((token, done) => {
      jwt.verify(token, secret, (err, user) => {
        if (err) return done(err);
        return done(null, user ? user : false);
      });
    })
  );

  module.exports = passport;
