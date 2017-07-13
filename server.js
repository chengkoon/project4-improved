const express = require('express');
const jwt = require('express-jwt');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/users');
const sponsorRoutes = require('./routes/sponsors');
const itemRoutes = require('./routes/items');
// const Agenda = require('agenda');


const app = express();

const url = process.env.MONGOLAB_URI;
// const url = 'mongodb://localhost:27017/meanauth';
mongoose.Promise = global.Promise;
// Connect To Database
// mongoose.connect(config.database);
mongoose.connect(url);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+url);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// const users = require('./routes/users');
// const sponsors = require('./routes/sponsors');
// const allRoutes = require('./routes/allRoutes');

// Port Number
const port = process.env.PORT || 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, './')));
// app.use(express.static(path.join(__dirname, '/dist/')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport); //replaced by express-jwt

// app.use('/users', users);
// app.use('/sponsors', sponsors);
// app.use('/', allRoutes);
app.use('/', itemRoutes);
app.use('/', jwt({secret: process.env.secret}).unless({method: 'POST'}), sponsorRoutes);
app.use('/', jwt({secret: process.env.secret}).unless({method: 'POST'}), userRoutes);

// Index Route
// app.get('/', (req, res) => {
//   res.send('Invalid Endpoint');
// });

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'dist/index.html'));
  res.sendFile(path.join(__dirname, 'index.html'));
})

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
  // for (var thing in process.env) {
  //   console.log('process.env is '+thing);
  // }
});
