window.onload = function () {
        var d = null;
        var current = localStorage.getItem('index');
        if (current == null) {
            current = 0;
        }
        else {
            current = parseInt(current);
        }
        //function inn(){setTimeout($('#uutiset').fadeIn(500),0)}
        //function fadeout(){setInterval($('#uutiset').fadeOut(500), 2000);}
        $.getJSON("https://vehkama1.firebaseio.com/uutiset.json", function (data) {
                console.log(current);
                d = data;
                $('#otsikko').hide().html(d.uutiset[current].otsikko).fadeIn(1000);//.setInterval($('#otsikko').fadeOut(1000), 6000);
                $('#päivämäärä').hide().html(d.uutiset[current].päivämäärä).fadeIn(1000);//.setInterval($('#päivämäärä').fadeOut(1000), 6000);
                $('#sisältö').hide().html(d.uutiset[current].sisältö).fadeIn(1000);//.setInterval($('#sisältö').fadeOut(1000), 6000);
                $('#photo').hide().html("<img src='" + d.uutiset[current].kuva + "'>").fadeIn(1000);//.setInterval($('#photo').fadeOut(1000), 6000);
               
            })

            function next() {
                switch (current) {
                case 0:
                    current = 1;
                    break;
                case 1:
                    current = 2;
                    break;
                case 2:
                    current = 0;
                    break;
                }
                localStorage.setItem('index', current);
                $('#otsikko').hide().html(d.uutiset[current].otsikko).fadeIn(1000);
                $('#päivämäärä').hide().html(d.uutiset[current].päivämäärä).fadeIn(1000);
                $('#sisältö').hide().html(d.uutiset[current].sisältö).fadeIn(1000);
                $('#photo').hide().html("<img src='" + d.uutiset[current].kuva + "'>").fadeIn(1000);
            }

            function previous() {
                switch (current) {
                case 0:
                    current = 2;
                    break;
                case 1:
                    current = 0;
                    break;
                case 2:
                    current = 1;
                    break;
                }
                localStorage.setItem('index', current);
                $('#otsikko').hide().html(d.uutiset[current].otsikko).fadeIn(1000);
                $('#päivämäärä').hide().html(d.uutiset[current].päivämäärä).fadeIn(1000);
                $('#sisältö').hide().html(d.uutiset[current].sisältö).fadeIn(1000);
                $('#photo').hide().html("<img src='" + d.uutiset[current].kuva + "'>").fadeIn(1000);
            }
    
            var slideshow = window.setInterval(function () {next()}, 5000);
    
            var changing = true; document.getElementById("next").onclick = function () {
                next()
            }; document.getElementById("prev").onclick = function () {
                previous()
            };

            function pause() {
                if (changing) {
                    changing = false;
                    document.getElementById("pause").innerHTML = ("play");
                    window.clearInterval(slideshow);
                }
                else {
                    changing = true;
                    document.getElementById("pause").innerHTML = ("pause");
                    slideshow = window.setInterval(function () {
                        next()
                    }, 3500);
                }
            }
            document.getElementById("pause").onclick = function () {
                pause()
            };
       
}


