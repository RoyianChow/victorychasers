// File name: comp229_midterm_301256903
// Name: Royian Chowdhury
// Student ID: 301256903
// Web app name: comp229-w2023-midterm-301256903.azurewebsites.net

import createError from 'http-errors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// Fix for __dirname using ESM
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Auth Step 1 - import passport modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';
import logger from 'morgan';

// Auth Step 3 - import the user model
import User from '../models/user.js';

// import db package
import mongoose from 'mongoose';

// Auth Step 2 - define our authentication strategy
let localStrategy = passportLocal.Strategy;

import cors from 'cors';
import passportJWT from 'passport-jwt';

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// import the router data
import indexRouter from '../routes/index.js';
import authRouter from '../routes/auth.js';

import authApiRouter from '../routes/api/auth-api.js';

import tournamentsRouter from '../routes/tournaments.js';
import tournamentsApiRouter from '../routes/api/tournaments-api.js';

const app = express();

// Complete the DB Configuration
import { MongoURI, Secret } from '../config/config.js';

mongoose.connect(MongoURI);
const db = mongoose.connection;

// Listen for Connections or Errors
db.on('open', () => console.log(`Connected to MongoDB at Localhost`));
db.on('error', () => console.error('Connection Error'));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Auth Step 4 - Setup Express Session
app.use(session({
  secret: Secret,
  saveUninitialized: false,
  resave: false
}));
app.use(flash());

// use routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', authApiRouter);

app.use('/', tournamentsRouter);
app.use('/', tournamentsApiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Auth Step 9 - Enable JWT
let jwtOption = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: Secret
};

// JWT Passport Strategy
let strategy = new JWTStrategy(jwtOption, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    res.render('error');
});

export default app;