let express = require('express');
let cors = require('cors');
const path = require('path');
const errorHandler = require('errorhandler');

//Import db object.
let db = require('./db');
//sync the db;
db.sequelize.sync();

//production or dev?
let isProduction = require('./config').db;


//set up the basic server
let app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
if(!(isProduction)) {
    app.use(errorHandler());
}

//real meat
app.use(require('./src/routes'));
app.use('/docs', express.static(path.join(__dirname, 'apidoc')));
//////////



//Error handler middlewares
if(!(isProduction)) {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
  
      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
});

app.listen(6677, () => console.log('Server running on http://localhost:6677/'));