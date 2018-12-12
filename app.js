const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// DB Config
require('./Config/db');

const app = express();

const poll = require('./routes/poll');

// Setup public Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser MiddleWare
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
// Cors
app.use(cors());

app.use('/poll', poll);

const port = 3000;

// Start Server
app.listen(port, () => { console.log(`Server is Started on Port: ${port}`) })