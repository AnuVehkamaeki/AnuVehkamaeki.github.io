var player1 = function(x,y,w, h,speed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    };

    var player = new player1(900/4,600/4,70,70, 7);
    
    function drawPlayer(context) {
      var x = player.x - (player.w / 2);
      var y = player.y - (player.h / 2);
      context.fillStyle = '#FF0000';
      context.fillRect(x,y, player.w, player.h);
    }

    function movePlayer(dir) {
      switch (dir) {
        case "left": 
          player.x -= player.speed;
          if (player.x < -20) {
            player.x = -20;
          }
          break;
        case "right":
          player.x += player.speed;
          if (player.x > (canvas.width-50)) {
            player.x = (canvas.width-50);
          }
          break;
        case "up":
          player.y -= player.speed;
          if (player.y < -10) {
            player.y = -10;
          }
          break;
        case "down":
          player.y += player.speed;
          if (player.y > (canvas.height-70)) {
            player.y = (canvas.height-70);
          }
          break;
      }
    }
    

    function speedUp(){
        if(player.speed < 30){player.speed = player.speed+2};
    };

    function speedDown(){
        if(player.speed > 1){player.speed = player.speed-2};
    };


    if(player)



    reset = function(){
        this.x = 100;
        this.y = 100;
        this.w = 30;
        this.h = 30;
        this.speed = 7;
    };


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
            //ctx.fillStyle = 'red';
            //ctx.strokeRect(x,y, player.w, player.h);
        };
        
    };


 
    


        
    

