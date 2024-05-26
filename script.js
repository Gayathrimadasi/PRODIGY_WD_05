document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('location-form');
    const locationInput = document.getElementById('location-input');
    const weatherInfo = document.getElementById('weather-info');
    const locationName = document.getElementById('location-name');
    const weatherDescription = document.getElementById('weather-description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const currentLocationButton = document.getElementById('current-location');
    const apiKey = '33e7320d8f38b5934a7ed3a1711bd7f9'; // Example API key

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const location = locationInput.value.trim();
        if (location) {
            getWeatherData(`q=${location}`);
        } else {
            alert('Please enter a location.');
        }
    });

    currentLocationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                getWeatherData(`lat=${latitude}&lon=${longitude}`);
            }, (error) => {
                alert('Unable to retrieve your location.');
                console.error('Geolocation error:', error);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    async function getWeatherData(query) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            console.log('API Response:', data); // Debugging line

            if (data.cod === 200) {
                locationName.textContent = data.name;
                weatherDescription.textContent = data.weather[0].description;
                temperature.textContent = data.main.temp;
                humidity.textContent = data.main.humidity;
                windSpeed.textContent = data.wind.speed;
                weatherInfo.classList.remove('hidden');
            } else {
                alert('Location not found. Please try again.');
                console.error('Error:', data); // Debugging line
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
            console.error('Error fetching weather data:', error); // Debugging line
        }
    }
});
