const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    os: {
        type: String,
        required: true
    },
    point: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('vote', voteSchema);