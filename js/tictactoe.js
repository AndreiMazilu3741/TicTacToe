// keep track of the turn to play
let activePlayer = 'X';
// store moves into an array; use this to determin win conditions
let selectedSquares = [];
// function to place x or o in a square
function placeXOrO (squareNumber) {
    // ensure a square is not already selected
    // .some() method to check each element of selectedSquare array to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // retrive the html element id that was clicked
        let select = document.getElementById(squareNumber);
        // check who's turn is
        if (activePlayer === 'X') {
            // if X is active, the x.png is placed in HTML
            select.style.backgroundImage = 'url("images/x.png")';
            // active player is X or O exclusively
        }
        else {
            // if O is active, the o.png is placed in HTML
            select.style.backgroundImage = 'url("images/o.png")';
        }
        // squareNumber and activePlayer are concatenated and added to array
        selectedSquares.push(squareNumber +activePlayer);
        // check for any win conditions
        checkWinConditions();
        // change active player
        if (activePlayer === 'X') {
            // if active is X, change to O
            activePlayer = 'O';
        }
        else {
            activePlayer = 'X';
        }
        // play placement sound
        Audio('./media/place.mp3');
        // check if it's computer's turn
        if (activePlayer === 'O') {
            // disable clicking for computer
            disableClick();
            // wait 1 second before placing the image and enable clicking
            setTimeout (function () { computerTurn(); }, 1000);
        }
        // return true for computersTurn() to work
        return true;
    }
    // a random square is selected
    function computersTurn() {
        // boolean needed for the while loop
        let success = false;
        //store a number 0 to 8
        let pickASquare;
        //allow while loop to keep trying if a square is already selected
        while (!success) {
            // a random number 0 to 8 is selected
            pickASquare = String(Math.floor(Math.random()*9));
            //if the random number evaluates returns true, the square hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                // change boolean and end loop
                success = true;
            }
        }
    }
}

// parse the selectedSquares array to search for win conditions
// drawWinLine function is called draw line if condition is met
function checkWinConditions() {
    // X 0, 1, 2 condition
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    // X 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    // X 1, 4, 7 condition
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    // X 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    // O 0, 1, 2 condition
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    // O 1, 4, 7 condition
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    // O 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); }
    // O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    // O 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    // check for tie; if none of the above and 9 selected, tie
    else if (selectedSquares.length >= 9) {
        // tie sound
        audio('./media/tie.mp3');
        // set a .3 seconds timer before resetGame is called
        setTimeout(function() { resetGame(); }, 1000);
    }
        // check if an array includes 3 strings; used for check for each win condition
        function arrayIncludes(squareA, squareB, squareC) {
            // check for 3 in a row
            const a = selectedSquares.includes(squareA);
            const b = selectedSquares.includes(squareB);
            const c = selectedSquares.includes(squareC);
            // if the 3 variables we pass are all included in the array, true is returned and else if condition executes the drawWinLine function
            if (a === true && b === true && c === true) { return true; }
        }
    }

// make the body element temporarily unclickable
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() { body.style.pointerEvents = 'auto'; }, 1000);
}

// take a string paraeter of the path for placement sound
function audio(audioURL) {
    // create a new audio object and pass the path as parameter
    let audio = new Audio(audioURL);
    // play the sound
    audio.play();
}

// function that ulilizes canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // access the canvas element
    const canvas = document.getElementById('win-lines');
    // give access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    // the start of a line's x axis, y axis, the and of x axis, y axis,
    let x1 = coordX1, y1 = coordY1, x2 = coordX2, y2 = coordY2,
    // store temporary x axis and y axis we update in the animation loop
    x = x1, y = y1;
    // interact with the canvas
    function animateLineDrawing() {
        // create the loop for whe the game end it restarts
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // clear content from last loop iteration
        c.clearRect(0, 0, 608, 608);
        // start a new path
        c.beginPath();
        // move to a starting point for our line
        c.moveTo(x1, y1);
        // the end point in our line
        c.lineTo(x, y);
        // set the width of our line
        c.lineWidth = 10;
        // set the color of our line
        c.strokeStyle() = 'rgba(70, 255, 33, .8)';
        // draw everything laid above
        c.stroke();
        // check if we've reached the endpoint
        if (x1 <= x2 && y1 <= y2) {
            // add 10 to the previous end x point
            if (x < x2) { x += 10; }
            // add 10 to the previous end y point
            if (y < y2) { y += 10; }
            // cancel animation loop if reach the end points
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
        // the same for 6, 4, 2 win condition
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }
    // clear the canvas after win line is drawn
    function clear() {
        // start animation loop
        const animationLoop = requestAnimationFrame(clear);
        // clear the canvas
        c.clearRect(0, 0, 608, 608);
        // stop animation loop
        cancelAnimationFrame(animationLoop);
    }
    // disallow clicking while win sound is playing
    disableClick();
    // play the win sound
    audio('./media/winGame.mp3');
    //call main animation loop
    animateLineDrawing();
    // wait 1 second, then clear canvas, reset game and allow clicking again
    setTimeout(function() { clear(); resetGame(); }, 1000);
}

// reset the game in a tie or a win
function resetGame() {
    // iterate through each square element
    for (let i = 0; i < 9; i++) {
        // get the html element of i
        let square = document.getElementById(String(i));
        // remove backgroundImage
        square.style.backgroundImage = '';
    }
    // reset array so it is empty so we can start over
    selectedSquares =[];
}