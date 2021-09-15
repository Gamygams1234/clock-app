var quotes;
var body = document.getElementById('body');
var header = document.getElementById('header');
var toggleBtn = document.getElementById('toggle');
var quoteHTML = document.getElementById('quote');
var quoteAuthorHTML = document.getElementById('quote-author');
var timeZoneHTML = document.getElementById('time-zone-display');
var refreshIcon = document.getElementById('refresh-icon');
var greetingIcon = document.getElementById('greeting-icon');
var locationHTML = document.getElementById('location-text');
var dayIndication = document.getElementById('day-indication');
var locationIndicator = document.getElementById('location-indicatior');

// city Stuff
var timeZone;
var city;
var regionCode;
var dayOfTheWeek;
var dayOfTheYear;
var weekNumber;
// time stuff
var timeHTML= document.getElementById('time-html');
var minutes = document.getElementById('minutes');


// for the rotation
var degrees = 0;
// for the more button
var more = true;

fetch("https://freegeoip.app/json/")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    timeZone = data.time_zone;
    city = data.city;
    regionCode = data.region_code;
  }).then(function(){
     getTime(timeZone);
     locationHTML.innerHTML = `In ${city}, ${regionCode}`
  }).catch(function(error){
      console.log(error)
  })

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    quotes = data;
  }).then(function() {
    getRandomQuote();
  })



  function getRandomQuote(){
      let randomNumber = Math.floor(Math.random() * quotes.length) + 1
      let text = quotes[randomNumber].text;
      let author = quotes[randomNumber].author;
      quoteHTML.innerHTML = `"${text}"`;
      quoteAuthorHTML.innerHTML = author;
  }


    refreshIcon.addEventListener("click", function() {
        getRandomQuote();
        degrees += 180;
        refreshIcon.style.transform = `rotate(${degrees.toString()}deg)`;
    });


    toggleBtn.addEventListener("click", function() {
        if (more == true){
            header.classList.add("hidden");
            toggleBtn.innerHTML= "Less";
            toggleBtn.classList.add("less");
            locationIndicator.classList.remove("hidden");
            more=false;
        }else if (more == false){
            header.classList.remove("hidden");
            locationIndicator.classList.add("hidden");
            toggleBtn.classList.remove("less");
            toggleBtn.innerHTML= "More";
            more = true;
        }
    });

  function getTime(param) {
    fetch(`http://worldtimeapi.org/api/timezone/${param}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            timeZoneHTML.innerHTML = data.abbreviation
            dayOfTheWeek = data.day_of_week;
            dayOfTheYear = data.day_of_year;
            weekNumber = data.week_number;
  
        }).catch(function(error){
            console.log(error)
        })

  }
  function getCurrentTime(){
    let d = new Date();
    let n = d.getHours();

    timeHTML.innerHTML = d.toTimeString().substr(0,5)
    if (n <= 4 || n>=18){
        body.classList.remove("day");
        greetingIcon.src = "./assets/desktop/icon-moon.svg";
        dayIndication.innerHTML =`Good Evening`;
    }else if(n>=5 && n<=12 ){
        body.classList.add("day");
        dayIndication.innerHTML =`Good Morning`;
        greetingIcon.src = "./assets/desktop/icon-sun.svg";
    }else {
        body.classList.add("day");
        dayIndication.innerHTML =`Good Afternoon`;
        greetingIcon.src = "./assets/desktop/icon-sun.svg";
    }
    document.getElementById('day-number').innerHTML= (dayOfTheWeek!=  undefined ? dayOfTheWeek + 1: "Loading...")
    document.getElementById('day-of-year').innerHTML= (dayOfTheYear!=  undefined ? dayOfTheYear: "Loading...");
    document.getElementById('time-zone-html').innerHTML= (timeZone!=  undefined ? timeZone: "Loading...");
    document.getElementById('week-number').innerHTML= (weekNumber!=  undefined ? weekNumber: "Loading...");
  }
  
 getCurrentTime()

 setInterval(function(){ getCurrentTime()
 ; }, 1000);



// onload

