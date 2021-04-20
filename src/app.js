//show current time
let current = new Date();
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];
let day = days[current.getDay()];
let date = current.getDate();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
let month = months[current.getMonth()];
let year = current.getFullYear();

let currentDay = document.getElementById("currentDay");
currentDay.innerHTML = `${day}`;
let currentDate = document.getElementById("currentDate");
currentDate.innerHTML = `${date}/${month}/${year}`;

let currentHours = current.getHours();
if(currentHours <10){
    currentHours = `0${currentHours}`;
 }

let currentMinutes = current.getMinutes();
if(currentMinutes <10){
   currentMinutes = `0${currentMinutes}`;
} 
let currentTime = document.getElementById("currentTime");
currentTime.innerHTML = `${currentHours}:${currentMinutes}`;

//submit the form
function handleSubmit(event){
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    showCity(city);
}
let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleSubmit);

//get data from server
function showCity(city) {
    let apiKey = "02466604a7f7484e8595ebcea0826deb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

//show real weather data
function showWeather(response) {
  console.log(response);
 
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temp;

  let city = response.data.name;
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = city;

  let description = response.data.weather[0].main;
  let weatherLike = document.querySelector("#weatherLike");
  weatherLike.innerHTML = description;

  let humidity = document.querySelector("#humidity");  
  let humid = response.data.main.humidity;
  humidity.innerHTML = `Humidity ${humid}%`;  

  let windSpeed = Math.round((response.data.wind.speed)*18/5);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML=`Wind ${windSpeed}km/h`;

}
showCity("sydney");

//get current location- handle click button
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//get position from server
function showPosition(position) {
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `02466604a7f7484e8595ebcea0826deb`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector(".button-current");
currentButton.addEventListener("click",getCurrentLocation);




