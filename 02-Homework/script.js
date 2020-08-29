// Universal Variables
const APIKey = "4616aadf95db5359b2e900bcbd6b5d46";
const citySearch = "london"
const latLonURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + citySearch + "&appid=" + APIKey;

// ajax call to get longitude and lattitude to use one call api
$.ajax({
    url: latLonURL,
    method:"GET"
}).then(function(response) {
    const unixDateTime = (response.dt);
    const dateObject = new Date(unixDateTime * 1000);
    const date = ("(" + (dateObject.getMonth() + 1) + "/" + dateObject.getDate() + "/" + dateObject.getFullYear() + ")");
    $(".current-city-info").text(response.name + " " + date);
    // stores lat and lon so that we can query the onecall api for the rest of the info
    const lat = (response.coord.lat);
    const lon = (response.coord.lon);
    const dataURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    // ajax call to get the remaining data to populate cards
    $.ajax({
        url: dataURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        const currentWeatherImg = ("http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
        const currentTempF = ((response.current.temp - 273.15) * 1.80 + 32);
        const currentHumidity = (response.current.humidity);
        const currentWindSpeed = (response.current.wind_speed);
        const UVIndex = parseInt(response.current.uvi);
        
        $(".current-city-info").append("<img class='weather-img' src=" + currentWeatherImg + ">");
        $(".current-temp").text("Temperature: " + Math.floor(currentTempF) + "*");
        $(".current-humidity").text("Humidity: " + Math.floor(currentHumidity) + "%");
        $(".current-wind").text("Wind Speed: " + Math.floor(currentWindSpeed) + " MPH");

        console.log(UVIndex)
        
        if (UVIndex < 3) {
            $(".uv-index").html("<h6 class='uv-index card-subtitle text-muted'>UV Index: <span class='uv-low uv'>" + UVIndex + "</span></h6>");
        } else if (UVIndex >= 3 && UVIndex < 6) {
            $(".uv-index").html("<h6 class='uv-index card-subtitle text-muted'>UV Index: <span class='uv-med uv'>" + UVIndex + "</span></h6>");
        } else if (UVIndex >= 6) {
            $(".uv-index").html("<h6 class='uv-index card-subtitle text-muted'>UV Index: <span class='uv-high uv'>" + UVIndex + "</span></h6>");
        }
    })
});

// LEFT NAVBAR FUNCTIONALITY

//city search needs to allow the user to type in a city. When the user hits the search button the city's weather data populates inside of the current city name and date as well as in the 5 day forecast

// previous cities that have been searched need to be stored in the city card

// RIGHT NAVBAR FUNCTIONALITY

// the current city name and date needs to populate the name of the city and the current date and the weather icon ((displayed City is what is entered) (date response.dt then convert using reponse.timezone) (icon is response.weather.icon))

// tempterature of the current city (response.main.temp)

// humidity of the current city (response.main.humidity)

// wind speed of the current city (response.wind.speed)

// uv index of the current city ()

// IN THE FIVE DAY FORECAST 

// display the date for each of the 5 days in the forecast

// display the weather icon for each of the days

// display the temperature for each of those days

// display the humidity of each of those days