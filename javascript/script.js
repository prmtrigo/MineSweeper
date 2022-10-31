//writing our board and rows
//it will work like a matrix, with rows and columns

var gameBoard = [];
var rows = 8;
var columns = 8;

var count = 5;

//where the bombs are located
var minesLocation = []; 

//not click the bombs!!
var tilesClicked = 0;

//flag settings
var flagEnabled = false;

//Game Over!!
var gameOver = false;

//now, it will start the game
//there are two steps!
//#1 - Set the mines
//#2 - Start the game

window.onload = function() {
    startGame();
}

//#1 - Set the mines
function setMines() {

    //setting mines in random places!!
    let minesLeft = count;

    while (minesLeft>0){
        let i = Math.floor(Math.random()*rows);
        let j = Math.floor(Math.random()*columns);
        let id = i.toString() + "-" + j.toString();

        if(!minesLocation.includes(id)){
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

//#2 - Start the game
function startGame(){
    document.getElementById("mines_count").innerText = count;
    document.getElementById("flag_button").addEventListener("click", setFlag);
    setMines();

    for (let i=0; i < rows; i++){
        let row = [];
        for (let j=0; j < columns; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.addEventListener("click",clickTile);
            document.getElementById("game_board").append(tile);
            row.push(tile);
        }
        gameBoard.push(row);
    }
    console.log(gameBoard);
}

//setting the flag - Enabling flag
function setFlag(){
    if(flagEnabled){
        flagEnabled = false;
    document.getElementById("flag_button").style.backgroundColor = "lightgray";
    }
    else{
        flagEnabled = true;
        document.getElementById("flag_button").style.backgroundColor = "darkgray";
    }
}

//function to click the tile
function clickTile(){
    if(gameOver || this.classList.contains("tile_clicked")){
        return;
    }

    let tile = this;
    if (flagEnabled){
        if(tile.innerText == ""){
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩"){
            tile.innerText = "";
        }
        return;
    }
    if (minesLocation.includes(tile.id)){
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-");
    let i = parseInt(coords[0]);
    let j = parseInt(coords[1]);
    checkMine(i, j);
}

function revealMines(){
    for(let i = 0; i<rows; i++){
        for(let j=0; j<columns;j++){
            let tile = gameBoard[i][j];
            if(minesLocation.includes(tile.id)){
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";  
            }
        }
    }
}


function checkMine(i,j){

    if(i<0 || i>= rows || j<0 || j>= columns){
        return;
    }
    //check how many elements is there
    console.log(gameBoard[i].lenght)
    if(gameBoard[i][j].classList.contains("tile_clicked")){
        return;
    }

    gameBoard[i][j].classList.add("tile_clicked");
    tilesClicked +=1;

    //set found mines
    let minesFound = 0;

    //checking mines

    //mines are contabilized if the tile "touches the mine"
    // n n m
    // m 2 n
    // n n n
    // we have two mines!

    //mines on top
    minesFound += checkTile(i-1, j-1);      
    minesFound += checkTile(i-1, j);        
    minesFound += checkTile(i-1, j+1);   
    
    //mines in the same line
    minesFound += checkTile(i, j-1);      
    minesFound += checkTile(i, j+1);   

    //mines on bottom
    minesFound += checkTile(i+1, j-1);      
    minesFound += checkTile(i+1, j);        
    minesFound += checkTile(i+1, j+1);  
    
    if(minesFound > 0){
        gameBoard[i][j].innerText = minesFound;
        gameBoard[i][j].classList.add("x" + minesFound.toString());
    }
    else
    {
        //mines on top
        checkMine(i-1, j-1);      
        checkMine(i-1, j);        
        checkMine(i-1, j+1);   
        
        //mines in the same line
        checkMine(i, j-1);      
        checkMine(i, j+1);   

        //mines on bottom
        checkMine(i+1, j-1);      
        checkMine(i+1, j);        
        checkMine(i+1, j+1);  
    }

    if(tilesClicked == rows * columns - count){
        document.getElementById("mines_count").innerText = "Cleared";
        gameOver = true;
    }
}

function checkTile(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= columns) {
        return 0;
    }
    if (minesLocation.includes(i.toString() + "-" + j.toString())) {
        return 1;
    }
    return 0;
}