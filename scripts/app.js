// ! Recursion

// I will use recursion once the button is click and the slot is empty, it will check and reveil all
// surrounding slots and stops when it finds one with a number ( which shows a mine is nearby)

/*function recursiveMineSweep(){
    if(slot is next to a named slot){
        // stop recursion
    }
    recurse();
}*/

// ! Psedocode

// * When the game starts up I want to see a welcome message and a button which begins the game.
//   Also a pannel on the left which gives the player instructions on how to play.

// * Once the player begins the game, a 10x10 grid will appear in the center of the screen
//   Above the grid is a timer to show how long the game has lasted
//   On the other side is the amount of flags you have remaining

// ? How will I generate the bombs onto the grid and the numbers displaying how many bombs are around each tile
//   The will start with a function which spawnsBombs
//      - It will spawn 10 random bombs across the grid
// !          I can image having some trouble with assigning the slot a class
//          - Generate 10 random numbers using math.floor and math.random
//          - Assinged the grid spot with the corresponding number a class of bomb but keep it hidden 
//      - Once spawned each individual grid slot will check how many bombs are around them
// !          This may cause me some trouble in figuring out how to check the 8 squares around the slot
//          - This is achived using the forEach function, checking each slot and whether the each a bomb on the surrounding grid and log the amount
//          - It will display the about of bombs

// * Once the game has begun the player can choose which grid slot to select
//   This will begin the timer
//   Once the slot is clicked it will either show
//      - An empty slot which will begin a flood fill and check all the connecting empty slots
//      - A number of the amout of bombs which are surounding it
//      - A bomb which will end the game
//          - A message will apear and the player will be able to play again
//          - A replay button will take the player to the start screen


// ? How will the player put flag on the slots they think have bombs inside
//   The player will right click the slot and a class will be added which displays a image of a flag to notify the player.

// * The player will keep on going until he has completed the board and what is left are the slots which have the bombs inside
//      - A message will appear congratulating them on winning the game
//      - The time taken will appear underneath
//      - They will click a button which allows them to play again

// ! Elements

const gridPositions = document.querySelector('.map')

// ! Variables

// ! Constants

// ! Executions

function minePosition(){
    const randomPos = Math.floor(Math.random() * 99)
    console.log(randomPos)
    const minePos = document.getElementById(`${randomPos}`);
    minePos.classList.add('mine')
}

//! Events

minePosition()