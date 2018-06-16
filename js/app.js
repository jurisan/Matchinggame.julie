/*
 * Create a list that holds all of your cards
 */
let icons = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

//Start the game!

function init() {
  let cards = shuffle(icons);
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

    //Add Click Event to each card
    click(card);
  }
}

//Card Click Event :)

//First Click - condition will be true.
let isFirstClick = true;


//Click Function
function click(card) {


//Card Click Event
  card.addEventListener("click", function() {
    if (isFirstClick) {
      // Call Start Timer Function
      startTimer();
      // Change our First Click - next click nothing will happen.
      isFirstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];

    //have one OPENED card
    if (openedCards.length === 1) {

      card.classList.add("open", "show", "disable");
      openedCards.push(this);

      //Compare the 2 Opened Cards
      compare(currentCard, previousCard);

    } else {
      //have NO OPENED cards
      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);
    }
  });
}

//Compare the 2 cards
function compare(currentCard, previousCard) {

 //Find Matches
  if (currentCard.innerHTML === previousCard.innerHTML) {

 //Found a Match!
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    openedCards = [];

    //Is the game over?
    isOver();

  } else {
  //Wait 500ms then go!
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
    }, 500);

    openedCards = [];
  }
  // Add New Move
  addMove();
}

//Check if Gameover?
function isOver() {
  if (matchedCards.length === icons.length) {
    // Stop the Timer!
    stopTimer();
    //Display Message/Alert!
    alert("Congratulations! You Won!");
  }
}



//Add Move
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  //Set Rating
  rating();
}

//Rating
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {
  if (moves < 10) {
    starsContainer.innerHTML = star + star + star;
  } else if (moves < 15) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}

//Timer
const timerContainer = document.querySelector(".timer");
let liveTimer,
  totalSeconds = 0;

timerContainer.innerHTML = totalSeconds + "s";

function startTimer() {
  liveTimer = setInterval(function() {
    // Increase the totalSeconds by 1 after 1000ms (1 sec).
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalSeconds + "s";
  }, 1000);
}

function stopTimer() {
//clear interval to stop the timer.
  clearInterval(liveTimer);
}

//Make the Restart Button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  //Delete all cards
  cardsContainer.innerHTML = "";

  //init to create new cards
  init();

  //Reset game
  reset();
});

  //resets the game
  function reset(){
  //Empty the Array
  matchedCards = [];

  //Reset moves
  moves = 0;
  movesContainer.innerHTML = moves;

  //Reset Star Rating
  starsContainer.innerHTML = star + star + star;

  //Reset the timer
  stopTimer(); //stop the timer
  isFirstClick = 'true'; //reset the isFirstClick = true to restart the timer.
  totalSeconds = 0; //reset back to zero seconds.
  timerContainer.innerHTML = totalSeconds + "s";
  }

  //// Start the game again for the first time :)
  init();



//* RESOURCE and Credits : MDN, Google, YouTube - P3 Memory Game Yahya Elharony, UDACITY Mentors, Group Discussions, Stack//







/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
