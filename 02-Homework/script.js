// Universal Variables
const APIKey = "4616aadf95db5359b2e900bcbd6b5d46";
let citySearch;
// Variables for latLonFunction
let unixDateTime;
let dateObject;
let date;
let lat;
let lon;
// Variables for populateMainData
let currentWeatherImg;
let currentTempF;
let currentHumidity;
let currentWindSpeed;
let UVIndex;
// Variables for populateFiveDay
let forecastUnixDateTime;
let forecastDateObject;
let forecastDate;
let weatherImg;
let temp;
let humidity;

// click listener to add citySearch value
$(".search-city").on("click", function() {
    event.preventDefault();
    citySearch = $(".user-input").val();
    APICalls();
});

// Function to gather latitude and longitude to request data from oneCall API
function latLonFunction(response) {
    unixDateTime = (response.dt);
    dateObject = new Date(unixDateTime * 1000);
    date = ("(" + (dateObject.getMonth() + 1) + "/" + dateObject.getDate() + "/" + dateObject.getFullYear() + ")");
    $(".current-city-info").text(response.name + " " + date);
    // stores lat and lon so that we can query the onecall api for the rest of the info
    lat = (response.coord.lat);
    lon = (response.coord.lon);
}
// Function to gather data to populate in current weather and forecast
function populateMainData(response) {
    // assigning data to main card variables
    currentWeatherImg = ("http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
    currentTempF = ((response.current.temp - 273.15) * 1.80 + 32);
    currentHumidity = (response.current.humidity);
    currentWindSpeed = (response.current.wind_speed);
    UVIndex = parseInt(response.current.uvi);
    // creating/updating html elements with variable data     
    $(".current-city-info").append("<img class='weather-img' src=" + currentWeatherImg + ">");
    $(".current-temp").text("Temperature: " + Math.floor(currentTempF) + "*");
    $(".current-humidity").text("Humidity: " + Math.floor(currentHumidity) + "%");
    $(".current-wind").text("Wind Speed: " + Math.floor(currentWindSpeed) + " MPH");
    if (UVIndex < 3) {
        $(".uv-index").html("<h6 class='uv-index card-subtitle text-muted'>UV Index: <span class='uv-low uv'>" + UVIndex + "</span></h6>");
    } else if (UVIndex >= 3 && UVIndex < 6) {
        $(".uv-index").html("<h6 class='uv-index card-subtitle text-muted'>UV Index: <span class='uv-med uv'>" + UVIndex + "</span></h6>");
    } else if (UVIndex >= 6) {
        $(".uv-index").html("<h6 class='uv-index card-subtitle text-muted'>UV Index: <span class='uv-high uv'>" + UVIndex + "</span></h6>");
    }
}
// Function to gather 5 day forecast data
function populateFiveDay(response) {
    for (let i = 0; i < 5; i++) {
        // assigning data to forecast card variables
        forecastUnixDateTime = (response.daily[i].dt);
        forecastDateObject = new Date(forecastUnixDateTime * 1000);
        forecastDate = ("(" + (forecastDateObject.getMonth() + 1) + "/" + forecastDateObject.getDate() + "/" + forecastDateObject.getFullYear() + ")");
        weatherImg = ("http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
        temp = ((response.daily[i].temp.day - 273.15) * 1.80 + 32);
        humidity = (response.daily[i].humidity);
        // creating/updating html elements with variable data   
        $(".date-" + [i]).text(forecastDate);
        $(".date-" + [i]).append("<img class='weather-img' src=" + weatherImg + ">");
        $(".temp-" + [i]).text("Temp: " + Math.floor(temp) + "*");
        $(".humidity-" + [i]).text("Humidity: " + Math.floor(humidity) + "%");
    }
}

// ajax call to get longitude and lattitude to use one call api 
function APICalls() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?" + "q=" + citySearch + "&appid=" + APIKey,
        method:"GET"
    }).then(function(response) {
        latLonFunction(response);
        // ajax call to get the remaining data to populate cards
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&appid=" + APIKey,
            method: "GET"
        }).then(function(response) {
            populateMainData(response);
            populateFiveDay(response);
            
        });
    });    
}
