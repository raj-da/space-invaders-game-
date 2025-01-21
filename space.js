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
