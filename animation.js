var canvas;
var ctx;

$(window).on('load',function(){
    
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext("2d");
    canvas.width = 1024/2;
    canvas.height = 768/2;
    
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
        drawPlayer(ctx);
        for(i = 0; i<enemies.length; i++){
            drawEnemy(ctx, enemies[i]);
        };
        SpriteSheet();
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
        for(i = 0; i<enemies.length; i++){
            moveEnemies(enemies[i]);
        };
    };

    
    /* Time-based motion animation */
    var main = function() {
      var now = Date.now();
      var delta = now - then;

      update(delta / 1000);
      render();

      then = now;

      // Request to do this again ASAP
      requestAnimationFrame(main);
    };

    var then = Date.now();
    main();
    
    
    
    
    
    
});

