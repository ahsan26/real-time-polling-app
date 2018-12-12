const form = document.querySelector('#vote-form');
const OSWITHVOTES = {
    windows: { vote: 0 },
    linux: { vote: 0 },
    macos: { vote: 0 },
    else: { vote: 0 }
};
// Form Submit
form.addEventListener('submit', e => {
    const choice = document.querySelector('input[name=os]:checked').value;
    console.log(choice)
    const data = { os: choice }
    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => { console.log(data) })
        .catch(err => { console.log(err) });

    e.preventDefault();
});

// Fetch Previous Votes
fetch('/poll')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.votes.forEach(vote => {
            console.log(vote)
            OSWITHVOTES[vote.os]['vote'] += parseInt(vote.point);
        });
        updateChart();
    });

Pusher.logToConsole = true;

var pusher = new Pusher('82156ba5ff93437b4e73', {
    cluster: 'ap2',
    forceTLS: true
});

var channel = pusher.subscribe('os-poll');
channel.bind('os-vote', async function (data) {
    OSWITHVOTES[data.os].vote += 1;
    updateChart();

});

// Chart
let chartContainer = document.querySelector('#chartContainer');
let data = [
    {
        x: ['Windows', 'MACOS', 'Linux', 'Else'],
        y: [OSWITHVOTES.windows.vote, OSWITHVOTES.macos.vote, OSWITHVOTES.linux.vote, OSWITHVOTES.else.vote],
        type: 'bar'
    }
];

Plotly.newPlot(chartContainer, data);

function updateChart() {
    data[0].y = [OSWITHVOTES.windows.vote, OSWITHVOTES.macos.vote, OSWITHVOTES.linux.vote, OSWITHVOTES.else.vote];
    Plotly.redraw(chartContainer);
}