var express = require('express');
var flightSeating  = require('./index.js').returnSeating;
var app = express();
app.set('view engine', 'pug')
app.get('/', function(req, res) {
    let rowsColumnsSeats = [
        [3, 2],
        [4, 3],
        [2, 3],
        [3, 4],
    ];
    let numberOfPassengers = 30
    let seatingArrangements = flightSeating(rowsColumnsSeats, numberOfPassengers);
    let dataToTemplate = { 
        seatingArrangements: JSON.stringify(seatingArrangements),
        numberOfPassengers, 
        rowsColumnsSeats: JSON.stringify(rowsColumnsSeats)
    };
    for(let [index, block] of rowsColumnsSeats.entries()) {
        let map = {
            0: 'one',
            1: 'two',
            2: 'three',
            3: 'four'
        }
        dataToTemplate[map[index]] = block[0];
    }
    res.render('flight-seating', dataToTemplate);
});

app.listen(3000);