const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
mongoose.Promise = global.Promise;

// heroku reqs
const path = require('path');
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/localdevs'
);

// heroku reqs
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the API server
app.listen(PORT, () =>
    console.log(`API Server now listening on PORT ${PORT}.`)
);