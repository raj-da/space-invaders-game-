let tileSize = 48;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

let shipWidth = tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows- tileSize*2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}
let shipImage;
let shipVelocityX = tileSize;


let alienArray = [];
let alienWidth = tileSize *2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;

let alienRows = 2;
let alienColums = 3;
let alienCount = 0;
let alienVelocityX = 1.5;

let bulletArray = [];
let bulletVelocitY = -10;

let score = 0;
let gameOver = 0;

window.onload = function(){
    board = document.getElementById("board")
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // context.fillStyle = "green";
    // context.fillRect(ship.x, ship.y, ship.width, ship.height);
    shipImage = new Image();
    shipImage.src = "./ship.png";
    shipImage.onload = function(){
        context.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
    }

    alienImage = new Image();
    alienImage.src = './alien.png'
    createAliens();
    

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);
}


function moveShip(e){
    if(gameOver) return;
    if(e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0){
        ship.x -= shipVelocityX;
    }
    if(e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width){
        ship.x += shipVelocityX;
    }
}
