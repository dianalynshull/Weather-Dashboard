// VARIABLES
const APIKey = "4616aadf95db5359b2e900bcbd6b5d46";
const citySearch = "American Fork"
const queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + citySearch + "&appid=" + APIKey;


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    // time conversion for unix time
    const unixDateTime = (response.dt);
    const dateObject = new Date(unixDateTime * 1000);
    const date = ("(" + (dateObject.getMonth() + 1) + "/" + dateObject.getDate() + "/" + dateObject.getFullYear() + ")");
    const weatherImg = ("http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
    const tempF = ((response.main.temp - 273.15) * 1.80 + 32);
    const humidity = (response.main.humidity);
    const windSpeed = (response.wind.speed);
    console.log(date);
    console.log(queryURL);
    console.log(response);
    console.log(response.name);
    $(".current-city-info").text(response.name + " " + date);
    $(".current-city-info").append("<img class='weather-img' src=" + weatherImg + ">");
    $(".current-temp").text("Temperature: " + Math.floor(tempF) + "*");
    $(".current-humidity").text("Humidity: " + Math.floor(humidity) + "%");
    $(".current-wind").text("Wind Speed: " + Math.floor(windSpeed) + " MPH");
    console.log(tempF)

    console.log(response.main.humidity);
    console.log(response.wind.speed);

    console.log(response.weather[0].icon)
})

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