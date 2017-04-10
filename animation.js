var canvas;
var ctx;

$(window).on('load',function(){
    
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext("2d");
    canvas.width = 1024/2;
    canvas.height = 768/2;
    
    var spritesheet = new SpriteSheet('flame.png', 2048/8, 2100/7, 3, 40);
    
    var spritesheetEnemies = new SpriteSheetEnemies('green.png', 900/6, 600/4, 3, 24);
    
    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
	   bgReady = true;
    };
    
    bgImage.src = "city.png";
  
    /* Listen to keyboard events */
    var keysDown = {};

    window.addEventListener("keydown", function(e) {
         keysDown[e.keyCode] = true;
    }, false);

    window.addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    });
  
    window.addEventListener("keydown", function(e){
        if([37,38,39,40].indexOf(e.keyCode)>-1){
            e.preventDefault();
        };
    });
    
    
    $('#speedUp').on('click', function(){
        speedUp();
    });
    
    $('#speedDown').on('click', function(){
        speedDown();
    });
    
  
    /* Draw everything */
    var render = function() {
        ctx.drawImage(bgImage,0,0,1024/2, 768/2);
        //drawPlayer(ctx);
        for(var i = 0; i<enemies.length; i++){
            spritesheetEnemies.draw(enemies[i].x, enemies[i].y);
            //drawEnemy(ctx, enemies[i]);
        };
        
    };

    /* Update stuff every loop */
    var update = function(delta) {
        if (38 in keysDown) {
           movePlayer("up");
        } 
        if (40 in keysDown) {
           movePlayer("down");
        }
        if (37 in keysDown) {
          movePlayer("left");
        }
        if (39 in keysDown) {
          movePlayer("right");
        }
        for(var i = 0; i<enemies.length; i++){
            moveEnemies(enemies[i]);
        };
    };

    
    /* Time-based motion animation */
    var main = function() {
      var now = Date.now();
      var delta = now - then;

      update(delta / 1000);
      render();

        /*ctx.clearRect(0, 0, 150, 150);*/
        spritesheet.update();
        spritesheetEnemies.update();
        spritesheet.draw(player.x, player.y);
        
      then = now;

      // Request to do this again ASAP
      requestAnimationFrame(main);
    };

    var then = Date.now();
    main();
    
    
    
    
    
    
});

