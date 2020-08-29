// Universal Variables
const APIKey = "4616aadf95db5359b2e900bcbd6b5d46";
let citySearch;

// search function
$(".search-city").on("click", function() {
    event.preventDefault();
    citySearch = $(".user-input").val();
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
            // defining and populating main card data
            const currentWeatherImg = ("http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
            const currentTempF = ((response.current.temp - 273.15) * 1.80 + 32);
            const currentHumidity = (response.current.humidity);
            const currentWindSpeed = (response.current.wind_speed);
            const UVIndex = parseInt(response.current.uvi);            
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
            // populating 5 day forecast with response
            for (let i = 0; i < 5; i++) {
                const forecastUnixDateTime = (response.daily[i].dt);
                const forecastDateObject = new Date(forecastUnixDateTime * 1000);
                const forecastDate = ("(" + (forecastDateObject.getMonth() + 1) + "/" + forecastDateObject.getDate() + "/" + forecastDateObject.getFullYear() + ")");
                const weatherImg = ("http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
                const temp = ((response.daily[i].temp.day - 273.15) * 1.80 + 32);
                const humidity = (response.daily[i].humidity);
                $(".date-" + [i]).text(forecastDate);
                $(".date-" + [i]).append("<img class='weather-img' src=" + weatherImg + ">");
                $(".temp-" + [i]).text("Temp: " + Math.floor(temp) + "*");
                $(".humidity-" + [i]).text("Humidity: " + Math.floor(humidity) + "%");
            }
        });
    });
});