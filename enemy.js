var enemy = function(x,y,w,h,speed, direction){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;  
    this.direction = direction;
    };
    
    var enemies = [];
    
    function getRandomInteger(min, max) {
            return (Math.random() * (max - min) + min)|2;
            };    
    
    function randomX(){ 
        var x = getRandomInteger(20,1024/2-20);
        return x;
    };
        
    function randomY(){ 
        var y = getRandomInteger(20,768/2-20);
        return y;
    };
        
    function randomSpeed(){
        var speed = getRandomInteger(0,7);
        return speed;
    };
    
    function randomDir(){
        var dir = getRandomInteger(0,3);
        return dir;
    };

 /* palauttaa true, jos koordinaatissa on enemy. */
    function checkCoords(x, y){
         for(i = 0; i< enemies.length; i++){
            if(x >= enemies[i].x && x <= enemies[i].x +20 && 
              y >= enemies[i].y && y <= enemies[i].y +20 /*|| x>=*/){
                return true
            } 
        }
        return false
    };


    var create = function(){
        var x = randomX();
        var y = randomY();
        while(checkCoords(x, y) /*|| (x==1024/2+20 && y==768/2+20*/){
            x = randomX();
            y = randomY();
        }
        var enemy = {
            x: x,
            y: y,
            w: 20,
            h: 20,
            speed: randomSpeed(),
            direction: randomDir()
        };
        return enemy;
    };
    
    for(i = 0; i<4; i++){
        enemies.push(create());
    };


    function drawEnemy(context, enemy) {
      var x = enemy.x - (enemy.w / 2);
      var y = enemy.y - (enemy.h / 2);
      context.fillStyle = 'blue';
      context.fillRect(x,y, enemy.w, enemy.h);
    };







/* ENEMYT EIVÄT ENÄÄ LIIKU, SAATI SITTEN KIMPOA TOISISTAAN */
    function moveEnemies(enemy) {
        if(enemy.direction == 0){
            enemy.y -= enemy.speed;
            if(enemy.y < 10){
                enemy.y = 10;
                enemy.direction =2;
            }
            /*if(checkCoords(enemy.x, enemy.y)){
                enemy.direction =2;
            }*/
        };
        if(enemy.direction == 1){
            enemy.x -= enemy.speed;
            if(enemy.x < 10){
                enemy.x = 10;
                enemy.direction =3;
            };
            /*if(checkCoords(enemy.x, enemy.y)){
                enemy.direction =3;
            }*/
        };
        if(enemy.direction == 2){
            enemy.y += enemy.speed;
            if(enemy.y > canvas.height-10){
                enemy.y = canvas.height-10;
                enemy.direction =0;
            };
            /*if(checkCoords(enemy.x, enemy.y)){
                enemy.direction =0;
            }*/
        };
        if(enemy.direction == 3){
            enemy.x += enemy.speed;
            if(enemy.x > canvas.width-10){
                enemy.x = canvas.width-10;
                enemy.direction =1;
            };
            /*if(checkCoords(enemy.x, enemy.y)){
                enemy.direction =1;
            }*/
        };
    };
    
    var mouseOnCanvasX;
    var mouseOnCanvasY;
    function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            mouseOnCanvasX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            mouseOnCanvasY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
            return {x: mouseOnCanvasX, y: mouseOnCanvasY}
    };


    function deleteEnemy(x, y){
        var thisEnemy;
             for(i = 0; i< enemies.length; i++){
                if(x >= enemies[i].x && x <= enemies[i].x +20 && 
                  y >= enemies[i].y && y <= enemies[i].y +20){
                    thisEnemy = i
                } 
            }
            enemies.splice(thisEnemy, 1)
    };


   window.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        var mouseCoords = getMousePos(canvas, e)
        if (e.which === 3 && checkCoords(mouseCoords.x, mouseCoords.y)){
            deleteEnemy(mouseCoords.x, mouseCoords.y)
        }
   }); 


    function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame) {
 
        var image = new Image();
        var framesPerRow;

        // calculate the number of frames in a row after the image loads
        var self = this;
        image.onload = function() {
            framesPerRow = Math.floor(image.width / frameWidth);
        };

        image.src = path;
        
        var currentFrame = 0;  // the current frame to draw
        var counter = 0;       // keep track of frame rate

        // Update the animation
        this.update = function() {
            // update to the next frame if it is time
            if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % endFrame;
            // update the counter
            counter = (counter + 1) % frameSpeed;
        ;}
        
        // Draw the current frame
        this.draw = function(x, y) {
            // get the row and col of the frame
            var row = Math.floor(currentFrame / framesPerRow);
            var col = Math.floor(currentFrame % framesPerRow);

            ctx.drawImage(image, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, 70, 70);
        };
        
    };
    
