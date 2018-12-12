const express = require('express');
const router = express.Router();
const Vote = require('../Models/vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '668166',
    key: '82156ba5ff93437b4e73',
    secret: '810807d62bbf019c18af',
    cluster: 'ap2',
    encrypted: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success: true, votes: votes }))
});

router.post('/', (req, res) => {

    const newVote = {
        os: req.body.os,
        point: 1
    };

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            point: parseInt(vote.points),
            os: vote.os
        });

        return res.json({ status: true, message: 'Thanks For Voting!' });
    });
});

module.exports = router;