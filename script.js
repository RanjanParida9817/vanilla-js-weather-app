const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const weatherCard = document.querySelector("#weather-card");
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const conditionTextEl = document.getElementById('condition-text');
const conditionIconEl = document.getElementById('condition-icon');
const errorMessageEl = document.getElementById('error-message');



const api_key = "9629e2e3bbfa73edd343b9bae3f60a26";


const updateUI = (data)=> {
    errorMessageEl.textContent = "";
    weatherCard.style.display = 'block';

    locationEl.textContent = data.name;
    temperatureEl.textContent = data.main.temp;
    conditionIconEl.textContent = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

async function fetchWeather(cityName){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`);
         if (response.status === 400) {
            throw new Error('City not found. Please try again.');
        }
        if (!response.ok) {
            throw new Error('An error occurred. Please try again later.');
        }

        const data = await response.json();
        updateUI(data);

    }
    catch(error){
        console.error(error);
    }


}


searchForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const cityName = cityInput.value.trim();
    if(cityName){
        fetchWeather(cityName);
        cityInput.value = '';
    }
})