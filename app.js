require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth');
const resumeRouter = require('./routes/resume');
const uploadRouter = require('./routes/upload');
const connect = require('./models');
const configPassport = require('./passport');

const app = express();
connect();
configPassport(passport);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/resume', resumeRouter);
app.use('/upload', uploadRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ redirect_url: '/error' });
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} pending!`);
});
