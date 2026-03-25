const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in the .env file.');
  process.exit(1);
}

mongodb.initDb((err) => { // Renamed 'mongodb' parameter to avoid shadowing the module
  if (err) {
    console.error('Failed to connect to the database:', err); // More descriptive error message
    process.exit(1); // Exit the process if DB connection fails
  } else {
    app.listen(port, () => { // Added callback for app.listen
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
