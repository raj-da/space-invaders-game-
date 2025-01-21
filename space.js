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