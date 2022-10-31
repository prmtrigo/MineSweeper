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
var enableFlag = false;