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


function update(){
    requestAnimationFrame(update);
    if(gameOver) return;

    context.clearRect(0,0, board.width, board.height);

    context.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);

    for(let i =0; i<alienArray.length; i++){
        let alien = alienArray[i];
        if(alien.alive) {
            alien.x += alienVelocityX;
            if(alien.x + alien.width >= board.width || alien.x <=0){
                alienVelocityX *= -1;
                alien.x += alienVelocityX*2;

                for(let j=0; j<alienArray.length; j++){
                    alienArray[j].y += alienHeight;
                }
            }
            context.drawImage(alien.img, alien.x, alien.y, alien.width, alien.height);
            if(alien.y >= ship.y) {
                gameOver = true;
                window.alert("Game Over")
                return
            }
        }
    }

    for(let i=0; i<bulletArray.length; i++){
        let bullet = bulletArray[i];
        bullet.y += bulletVelocitY;
        context.fillStyle = "blue";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        for(let j = 0; j<alienArray.length; j++){
            let alien = alienArray[j];
            if(!bullet.used && alien.alive && detectCollision(alien, bullet)){
                alien.alive  = false;
                bullet.used = true;
                alienCount--;
                score+=100;
            }
        }
        
    }
    while(bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y <0)){
        bulletArray.shift();
    }

    if(alienCount == 0){
        alienColums = Math.min(alienColums + 1, columns/2 - 2);
        alienRows = Math.min(alienRows+1, rows-4)
        alienVelocityX+=0.2;
        alienArray = [];
        bulletArray = [];
        createAliens();
    }

    context.fillStyle = "white";
    context.font = "16px courier";
    context.fillText(`Score: ${score}`, 5, 20);
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

function createAliens() {
    for (let c = 0; c < alienColums; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alienImage = new Image(); 
            
            let color = Math.round((Math.random() * 100) % 3) + 1;
            switch (color) {
                case 1:
                    alienImage.src = "./alien.png";
                    break;
                case 2:
                    alienImage.src = "./alien-cyan.png";
                    break;
                case 3:
                    alienImage.src = "./alien-yellow.png";
                    break;
                case 4:
                    alienImage.src = "./alien-magenta.png";
                    break;
                default:
                    break;
            }
            
            console.log(color);
            let alien = {
                img: alienImage,
                x: alienX + c * alienWidth,
                y: alienY + r * alienHeight,
                width: alienWidth,
                height: alienHeight,
                alive: true
            };
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

function shoot(e){
    if(gameOver) return;

    if(e.code == "Space"){
        let bullet = {
            x: ship.x + shipWidth*15/32,
            y: ship.y,
            width: tileSize/8,
            height: tileSize/2,
            used: false
        }
        bulletArray.push(bullet);
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
