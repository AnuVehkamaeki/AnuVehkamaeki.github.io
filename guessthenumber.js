            window.onload = function(){

            function getRandomInteger(min, max) {
            return (Math.random() * (max - min) + min)|2;
            }    
        
            var number = getRandomInteger(1,11);
            
            function compareNumbers (x, y){
                console.log(number)
                if (1>y){alert("Your input is invalid. The number must be between 1 and 10.");}
                else if (y>10){alert("Your input is invalid. The number must be between 1 and 10.");}
                else if (y%1!=0){alert("Your input is invalid. The number must be an integer.");}
                else if (x!=y){alert("Your guess wasn't right. Go ahead and try again!");} 
                else {alert("Congratulations! You guessed correctly!");
                       number = getRandomInteger(1,11);}
            
            document.getElementById("button1").addEventListener("click", function(){
                var guess = document.getElementById("number").value;
                compareNumbers(number, guess)});
            
            }
            }