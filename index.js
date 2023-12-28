/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    
    for(let i = 0; i < games.length; i++) {
        let div_Add = document.createElement("div");
        div_Add.classList.add("game-card");
        
        const display = `
            <p> Name: ${games[i].name} </p>
            <p> Description: ${games[i].description} </p>
            <p> Pledged: ${games[i].pledged} </p>
            <p> Goal: ${games[i].goal} </p>
            <p> Backers: ${games[i].backers} </p>
            <img src = ${games[i].img} alt = "${games[i].name}" class = "game-img">
        `;

        div_Add.innerHTML = display;
        let container = document.getElementById("games-container");
        container.appendChild(div_Add);
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

/* Quick notes on Javascript 'reduce' function:
    + Function acts as a for loop and takes two arguments, a callback function and an initial value for the accumulator (variable that keeps track of count).

    Example:

    const totalListens = songs.reduce( (acc, song) => {
        return acc + song.listens;
    }, 0);    

    + 'song' is officially the same as songs[i] in a for loop.

    variable = objectName.reduce( (accumulator, placeholder)) => {
        return accumulator + placeholder.whatEver;
    }, initialValueofAccumulator);

*/



// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const contributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
let para = document.createElement("p");
para.innerHTML = `${contributions.toLocaleString('en-US')}`; //variable.toLocaleString('en-US') gives a number with comma format.
contributionsCard.appendChild(para);


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const pledged = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);


// set inner HTML using template literal
para = document.createElement("p");
para.innerHTML = `${pledged.toLocaleString('en-US')}`;
raisedCard.appendChild(para);

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

para = document.createElement("p");
para.innerHTML = `${GAMES_JSON.length.toLocaleString('en-US')}`;
gamesCard.appendChild(para);


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let gamesWithgoalUnmet = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    console.log(gamesWithgoalUnmet.length);
    addGamesToPage(gamesWithgoalUnmet);
}




// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let gamesWithgoalMet = GAMES_JSON.filter( (games) => {
        return games.pledged >= games.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    console.log(gamesWithgoalMet.length);
    addGamesToPage(gamesWithgoalMet);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let gamesWithgoalUnmet = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
});

// create a string that explains the number of unfunded games using the ternary operator

let displayStr = `A total of $${pledged.toLocaleString('en-US')} was raised for ${GAMES_JSON.length} games. ${gamesWithgoalUnmet.length > 0 ? `Currently, ${gamesWithgoalUnmet.length} remain unfunded.` : "All games are currently funded thanks to you lovely people."}`;

// create a new DOM element containing the template string and append it to the description container
para = document.createElement("p");
para.innerHTML = displayStr;
descriptionContainer.appendChild(para);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => { //sort function
    return item2.pledged - item1.pledged;
});

const {name, description, pledged1, goal, backers, img} = sortedGames[0];

// create a new element to hold the name of the top pledge game, then append it to the correct element
para = document.createElement("p");
para.innerHTML = `${name}`;
firstGameContainer.appendChild(para);

// do the same for the runner up item

para = document.createElement("p");
para.innerHTML = `${sortedGames[1].name}`;
secondGameContainer.appendChild(para);