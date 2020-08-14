const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const app = express();


//importing my models
const CovidReg = require('./models/covidRegModule');


// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


//pug engine
app.set('view engine', 'pug');
app.set('views', './views');

//rendering views
var view = "./views/"

mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

  }
);
mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection now open...");
  })
  .on("error", err => {
    console.log(`Connection error: ${err.message}`);
  });

//setting a path for the static files
app.use(express.static(path.join(__dirname, 'public')));

//getting Covidregistrationm page and setting a route for it
app.get('/', (req, res) => {
  res.sendFile("index.html", { root: view});
});

app.post('/', async (req, res) => {
  save(req.file);
  const CovidReg = new CovidReg({
      surname: req.bodysurname3,        
      DateofBirth: req.body.DateofBirth,
      Givenname: req.body.Givenname,
      placeOfresidence: req.body.placeOfresidance,
      Occupation: req.body.Occuppation,
      gender: req.body.gender,
      category: req.body.category,

  });
  try {
      await covidReg.save();
      console.log(req.body);        
      res.redirect('/')
  } catch (err) {
      res.send('Sorry! Something went wrong.')
      console.log(err)
  }
});


// For invalid routes
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});


//start listening to the server
app.listen(3000, function () {
  console.log('listening to your code on 3000...')
});