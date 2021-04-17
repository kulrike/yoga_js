window.addEventListener("DOMContentLoaded", function() {

    'use strict';

    //Tabs

    let infoHeader = document.querySelector(".info-header"),
        infoHeaderTab = document.querySelectorAll(".info-header-tab"),
        infoTabContent = document.querySelectorAll(".info-tabcontent");


    function hideInfoTabContent(a) {
        for (let i = a; i < infoTabContent.length; i++) {
                infoTabContent[i].classList.remove("show");
                infoTabContent[i].classList.add("hide");
        }
    }

    hideInfoTabContent(1); //эта функция отвечает за сокрытие элементов, за исключением первого элемента "0",
    //то есть если передать в переменную 0, то отсчет начнется именно с первого элемента и будут сокрыты все элементы infotabcontent.

    function showInfoTabContent(b){
        if (infoTabContent[b].classList.contains("hide")) {
            infoTabContent[b].classList.remove("hide");
            infoTabContent[b].classList.add("show");
        }
    } //эта функция отвечает за появление элемента, аргумент b является техническим, для того чтобы появилась возможность передачи в нее переменной(индекса, который будет определеться следующей функцией). пока что не вызываем 

    infoHeader.addEventListener("click", function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < infoTabContent.length; i++) {
                if (target == infoHeaderTab[i]){
                    hideInfoTabContent(0);
                    showInfoTabContent(i);
                    break;
                }
            }
        }
    });

    

    // Timer


    let deadline = "2020-04-08";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()) - 10800000, // -1080000 добавлен в связи  с расхождением времени vscode и реальным временем, скорее всего из за часового пояса, пока не разобрался.
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor ((t/1000/60/60));

            return {
                'total' : t,
                'seconds' : seconds,
                'minutes' : minutes,
                "hours" : hours
            };

    }

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            seconds = timer.querySelector(".seconds"),
            minutes = timer.querySelector(".minutes"),
            hours = timer.querySelector(".hours"),
            timeInterval = setInterval(updateClock, 1000);

            function updateClock () {
                let t = getTimeRemaining(endtime);

                function addZero(num) {
                    if (num <= 9) {
                        return  "0" + num;
                    } else {
                        return num;
                    }
                }

                seconds.textContent = addZero(t.seconds);
                minutes.textContent = addZero(t.minutes);
                hours.textContent = addZero(t.hours);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                    seconds.textContent = "00";
                    minutes.textContent = "00";
                    hours.textContent = "00";
                }
            }

    }

    setClock("timer",deadline);

    // modal

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");

        more.addEventListener("click", function(){
            overlay.style.display = "block";
            this.classList.add("more-spalsh");
            document.body.style.overflow = "hidden";
        });

        close.addEventListener("click", function(){
            overlay.style.display = "none";
            more.classList.remove("more-spalsh");
            document.body.style.overflow = "";
        }); 


        let descrBtn = document.querySelectorAll(".description-btn"),
            content = document.querySelector(".content");

        

        content.addEventListener("click", function(event){
            let target = event.target;
            for (let i = 0; i < descrBtn.length; i++) {
                if (target == descrBtn[i]) {
                    overlay.style.display = "block";
                    document.body.style.overflow = "hidden";
                }
            }
        });


        //Form

        
        let message = {
            loading: "Загрузка...",
            success: "Спасибо! скоро мы с вами свяжемся...",
            failure: "Что-то пошло не так..."
        };

        let form = document.querySelector(".main-form"),
            input = form.querySelectorAll("input"),
            statusMessage = document.createElement("div");

            statusMessage.classList.add("status");

        form.addEventListener("submit", function(event){
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-Type", "application/x-www-form-urlendcoded");

            let formData = new FormData(form);
            request.send(formData);

            request.addEventListener("readystatechange", function(){
                if (request.readyState < 4) {
                    statusMessage.textContent = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.textContent = message.success;
                    input.value = "";
                } else {
                    statusMessage.textContent = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
        });


        //Slider

        let sliderItem = document.querySelectorAll(".slider-item"),
            prev = document.querySelector(".prev"),
            next = document.querySelector(".next"),
            dots = document.querySelector(".slider-dots"),
            dot = document.querySelectorAll(".dot"),
            sliderIndex = 1;

            function showSlider(n) {

                if (n > sliderItem.length){
                    sliderIndex = 1;
                }

                if (n < 1) {
                    sliderIndex = sliderItem.length;
                }

                for (let i = 0; i < sliderItem.length; i++) {
                    sliderItem[i].style.display = "none";
                    dot[i].classList.remove("dot-active");
                }

                sliderItem[sliderIndex-1].style.display = "block";
                dot[sliderIndex-1].classList.add("dot-active");

                

                
            }


           function changeSlide(n) {
               sliderIndex +=n;
               showSlider(sliderIndex);              
           }

           function currentSlide(n) {
               showSlider(sliderIndex = n);
           }

           next.addEventListener("click", function(){
            changeSlide(1);
           });

           prev.addEventListener("click", function(){
               changeSlide(-1);
           });

           dots.addEventListener("click", function(event){
                for (let i = 0; i < dot.length +1; i++){
                    if (event.target.classList.contains("dot") && event.target == dot[i-1]){
                        currentSlide(i);
                    }
                }
           });

           

            

            showSlider(sliderIndex);


            //calculator

            let persons = document.querySelectorAll(".counter-block-input")[0],
                days = document.querySelectorAll(".counter-block-input")[1],
                place = document.getElementById("select"),
                totalValue = document.getElementById("total"),
                personSum = 0,
                daySum = 0,
                total = 0;

                totalValue.textContent = 0;

                persons.addEventListener("input", function(){
                    personSum = +this.value;
                    total = (daySum * personSum) * 4000;

                    if (days.value == ""){
                        totalValue.textContent = 0;
                    } else {
                        totalValue.textContent = total;
                    }
                });

                days.addEventListener("input", function(){
                    daySum = +this.value;
                    total = (daySum * personSum) * 4000;

                    if (persons.value == ""){
                        totalValue.textContent = 0;
                    } else {
                        totalValue.textContent = total;
                    }
                });

                place.addEventListener("change", function(){
                    if ((days.value == "") && (persons.value == "")){
                        totalValue.textContent = 0;
                    } else {
                        let a = total;

                        totalValue.textContent = a * this.options[this.selectedIndex].value;
                    }
                });

                
                

            


        

});