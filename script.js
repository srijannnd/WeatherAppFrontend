const url = "http://127.0.0.1:5000/weather_data";

function getWeather() {
    const zip = document.getElementById('zip').value;
    const cityNames = document.getElementById('cities').value.split(",").map(function(item) {
          return item.trim();
        });
    console.log(cityNames);
    const weatherCards = document.getElementById('weatherCards');
    weatherCards.innerHTML = ''; // Clear previous cards

    // Fetch weather data for user input zip code
    fetch(`${url}?&query=${zip}`)
        .then(response => response.json())
        .then(data => {
            createWeatherCard(data.location.name, data.current.temperature, data.current.weather_descriptions[0]);
        })
        .catch(error => {
            console.error('Error fetching user weather:', error);
            alert("Please enter a valid zipcode")
        });

    // Fetch weather data for pre-selected cities
    cityNames.forEach(city => {
        fetch(`${url}?&query=${city}`)
            .then(response => response.json())
            .then(data => {
                createWeatherCard(data.location.name, data.current.temperature, data.current.weather_descriptions[0]);
            })
            .catch(error => {
                console.error(`Error fetching ${city} weather:`, error);
                alert(`"${city}" is not a valid city`)
            });
    });
}

function createWeatherCard(location, temperature, description) {
    const weatherCards = document.getElementById('weatherCards');

    const card = document.createElement('div');
    card.classList.add('weather-card');
    card.innerHTML = `
        <h3>${location}</h3>
        <div class="temperature">${temperature}°C</div>
        <div class="description">${description}</div>
    `;

    weatherCards.appendChild(card);
}
