const mongoose = require('mongoose');

// Map Global Promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
    .connect('mongodb://admin:admin0000@ds123753.mlab.com:23753/voting_app')
    .then(() => { console.log('MongoDB connected!') })
    .catch(err => {
        console.log('err: ', err);
    });