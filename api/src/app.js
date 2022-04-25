require('dotenv').config();
const express =  require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const cors = require("cors");
const morgan = require("morgan");
const router  = require("./routes/index.js");
const passport = require("passport");
require("./middlewares/passport");

const app = express();

app.name = "API";

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  //ToDo resolve origin conflicts.
  //actualice para que coincida con el dominio desde el que realizará la solicitud
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  next();
});
app.all("*", function (req, res, next) {
  passport.authenticate("bearer", (err, user) => { 
    if (err) return next(err);
    if (user) { req.user = user; }
    return next(); 
  }) (req, res, next);
});


app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

app.use((req, res, next) => {
    next();
 });

app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = app;