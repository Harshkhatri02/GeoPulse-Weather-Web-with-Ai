//NEWS ::=> 35293d6f1b8e4d858a57e606283c8012

// import { stringify } from "uuid";

// import session = require("express-session");

//  user--  harshkhatri682 pass--    ClFixcGo5EakzOKw
// let weatherApiKey;
// let pixabayApiKey;

// API keys storage
let weatherApiKey = null;
let pixabayApiKey = null;

// Fetch API keys from server
async function getApiKeys() {
    try {
        const response = await fetch('/api/keys');
        if (!response.ok) {
            throw new Error('Failed to fetch API keys. Please ensure you are logged in.');
        }
        const keys = await response.json();
        weatherApiKey = keys.weatherApiKey;
        pixabayApiKey = keys.pixabayApiKey;
        console.log('API keys loaded successfully');
    } catch (error) {
        console.error('Error fetching API keys:', error);
        alert('Please log in to access weather information');
    }
}

// Initialize API keys immediately
await getApiKeys();

// Constants
const currentDate = new Date();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Get DOM elements
const searchInput = document.getElementById('input-for-search');
const searchSuggestions = document.getElementById('searchSuggestions');

let timeoutId;
    
searchInput.addEventListener('input', async (event) => {
    if (!weatherApiKey) {
        await getApiKeys(); // Try to get keys if not available
        if (!weatherApiKey) return; // Exit if still not available
    }
    const query = event.target.value;
    if (query.length > 0) {
        try {
            const suggestions = await fetchSuggestions(query);
            renderSuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    } else {
        clearSuggestions();
    }
});

async function fetchSuggestions(query) {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${query}`);
    if (!response.ok) {
        throw new Error('Weather API request failed');
    }
    const data = await response.json();
    return data;
}

function renderSuggestions(suggestions) {
    searchSuggestions.innerHTML = '';
    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = suggestion.name;
        suggestionDiv.classList.add('styles');
        //Clear suggestion if the user selects on of them, put that selected in input
        suggestionDiv.addEventListener('click',async (e) => {
            await clearSuggestions();
            searchInput.value = suggestion.name;
            
        });
        searchSuggestions.appendChild(suggestionDiv);
    });
}

async function clearSuggestions() {
    searchSuggestions.innerHTML = '';
    //Making the main div of the syggestion NULL(empty) if one of the suggestion of the main suggestion div is clicked
}

//-------------------------------------------------------------------------------------
//JSDOM

// WeatherAPI endpoint for current weather
const weatherApiEndpoint = "https://api.weatherapi.com/v1/";

// Unsplash API endpoint for fetching images
// const unsplashApiEndpoint = "https://pixabay.com/api/";
const searchButton = document.querySelector('.search-bar button');
// Function to fetch weather information
async function fetchWeather(location) {
    const response = await fetch(`${weatherApiEndpoint}forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=yes`);
    const data = await response.json();
    return data;
}    

async function forecastUpdates(data){
    const forecastDays = document.querySelector('.forecast-days');
    forecastDays.innerHTML = '';
        var counter=0;
        data.forEach(day => {

            const dayOfWeekIndex =  (currentDate.getDay() + counter) % 7; // Add 1 to skip the current day
            counter++;
            const dayOfWeek = daysOfWeek[dayOfWeekIndex];
            forecastDays.innerHTML += `<div class="day"><p>${dayOfWeek}</p><p>${day.day.avgtemp_c}°</p></div>`;
        });    
        
    }
async function textOnImageUpdates(data){
    document.querySelector('.temp').innerHTML = `<p>${data.current.temp_c}°C</p><p>${data.current.condition.text}</p>`;
    
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    
        const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
        
        document.querySelector('.date').innerHTML = `<h2>${formattedDate}</h2><p>${data.location.name},${data.location.country}</p>`;
    }

async function highlightUpdates(data){
        const highlights = document.querySelectorAll('.highlight');
        // Good (0-12): 0-50 // Moderate (12.1-35.4): 51-100 // Unhealthy for Sensitive Groups (35.5-55.4): 101-150
        // Unhealthy (55.5-150.4): 151-200// Very Unhealthy (150.5-250.4): 201-300// Hazardous (250.5-500.4): 301-500
        var aqiValue = "";
        const pm2_5 = data.air_quality.pm2_5;
        if(pm2_5>=0 && pm2_5<=12){
            aqiValue = "Good";
        }else if(pm2_5>=12.1 && pm2_5<=35.4){
            aqiValue = "Moderate";
        }else if(pm2_5>=35.5 && pm2_5<=55.4){
            aqiValue = "Unhealthy for sensitive groups";
            
        }else if(pm2_5>=55.5 && pm2_5<=150.4){
            aqiValue = "Unhealthy";
        }else if(pm2_5>=150.5 && pm2_5<=250.4){
            aqiValue = "Very Unhealthy";
        }else if(pm2_5>=250.5 && pm2_5<=500.4){
            aqiValue = "Hazardous";
        }else{
            aqiValue = "Data Not Available";
        }

        if(aqiValue.length>10){
            highlights[0].innerHTML = `<p>Air Quality Index</p><small style="color:black;">${aqiValue}</small>`;
        }else{
            highlights[0].innerHTML = `<p>Air Quality Index</p><p>${aqiValue}</p>`;
        }
        highlights[1].innerHTML = `<p>Humidity</p><p>${data.humidity}%</p>`;
        highlights[2].innerHTML = `<p>PM2.5</p><p>${pm2_5}</p>`;
        highlights[3].innerHTML = `<p>NO2</p><p>${data.air_quality.no2}</p>`;
        highlights[4].innerHTML = `<p>Pressure</p><p>${data.pressure_mb}hPa</p>`;
        highlights[5].innerHTML = `<p>Visibility</p><p>${data.vis_km}km</p>`;
        highlights[6].innerHTML = `<p>Feels Like</p><p>${data.feelslike_c}°C</p>`;
    }
    
async function locationUpdates(data){
    document.querySelector('.location').innerHTML = `<p>Current Location: ${data.name || data.lat}, ${data.country || data.lon}</p>`;
}

async function hourlyUpdates(data){
    
    const timeDivs = document.querySelectorAll('.time-data');
    const hours = data;
    const timesToDisplay = ['3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
    
    hours.forEach((entry, index) => {
        const time = new Date(entry.time_epoch * 1000).toLocaleString('en-US', { hour: 'numeric', hour12: true });
        
        if (timesToDisplay.includes(time)) {
            const tempC = entry.temp_c;
            timeDivs[timesToDisplay.indexOf(time)].innerHTML = `
            <p>${time}</p>
            <p>${tempC}&deg;</p>
            `;
        }
    });
    
}

async function loadingAnimation(){
    const pTags = document.querySelectorAll(".time-data>p,.highlight>p,.day>p");
    
    pTags.forEach((p) => {
        p.style.color = "transparent";
    });
    if(document.querySelector('.highlight>small')){
        const  smallTag = document.querySelectorAll('.highlight>small');
        smallTag[0].style.color ="transparent";
    }
    
    // Return a Promise that resolves after the animation duration
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500); // 500ms for the animation
    });
}
async function displayWeaterData(data){
    await loadingAnimation();
    //3 days Forecast
    await forecastUpdates(data.forecast.forecastday);
    //image and text
    await textOnImageUpdates(data);
    //highlights
    await highlightUpdates(data.current);
    //Location and Hour
    await locationUpdates(data.location);
    //forecast
    await hourlyUpdates(data.forecast.forecastday[0].hour);
    
    //Temporary
    const pTags = document.querySelectorAll(".time-data>p,.highlight>p,.day>p");
    
    pTags.forEach((p)=>{
        p.style.color = "black";
    });
}                    
    // Function to fetch a random image from Unsplash
    async function fetchBackgroundImage(query,funcName=0) {
        query = query + " weather";
    if(funcName==1){
         return 'blue-back-reviews.jpg';
    }
        const response = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${query}&image_type=photo`);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        // console.log(data.hits[randomIndex]);
        // return data.hits[randomIndex].webformatURL;
        return data.hits[randomIndex].largeImageURL;        

}

//Background Img and txt color
async function setBackgroundImg(backgroundImageUrl){
    const backImageContainer = document.getElementsByClassName("container-for-background-img")[0];
    backImageContainer.style.backgroundImage = `url('${backgroundImageUrl}')`;
    
    // Set font color based on background brightness
    const img = new Image();
    img.crossOrigin = "Anonymous";  
    img.src = backgroundImageUrl;
    img.onload = function() {
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const color = getAverageColor(data, canvas.width, canvas.height);
        
        const textColor = colorBrightness(color) > 128 ? 'black' : 'white';
        
        backImageContainer.querySelectorAll('h1, h2,p').forEach(element => {
            element.style.color = textColor;
        });
    };
    
}

//Main Function for all the changes  in the DOM 
// Function to update background image and font color based on weather
async function updateWeatherBackground(location,funcName=0) {
    const weatherData = await fetchWeather(location);
    await displayWeaterData(weatherData);
    const weatherCondition = weatherData.current.condition.text;
    const backgroundImageUrl = await fetchBackgroundImage(weatherCondition,funcName);
    
    //set Background image and Text Color
    await setBackgroundImg(backgroundImageUrl);    
}

// Function to calculate brightness of a color
function colorBrightness(color) {
    const colorBrightness = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
    return colorBrightness;
}

//Function to get average color from image data
function getAverageColor(data, width, height) {
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
    }
    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);
    return { r, g, b };
}

function defaultWeather() {
    const defaultLocation = "London";
    if(userSavedLoc===""){
        userSavedLoc=defaultLocation;
    }else{
        userSavedLoc=userSavedLoc;
    }

    // else{
    //     userSavedLoc=userSavedLoc;
    // }
    updateWeatherBackground(userSavedLoc, 1);
}

document.addEventListener("DOMContentLoaded", defaultWeather);

var currentLocationDetected = false;

// Get the geolocation button
const geolocationBtn = document.querySelector('.geolocation-btn');

// Function to handle geolocation
async function handleGeolocation() {
    if (!currentLocationDetected && navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const location = `${lat},${lon}`;
            
            await clearSuggestions();
            searchInput.value = '';
            await updateWeatherBackground(location);
            currentLocationDetected = true;
            
        } catch (error) {
            console.error("Geolocation error:", error);
        }
    }
}

// Add click event listener to geolocation button
geolocationBtn.addEventListener('click', handleGeolocation);

// Search Functioning
searchButton.addEventListener('click',async()=>{
    const searchedData = searchInput.value;
    if(searchedData!=='')
    await clearSuggestions();
        currentLocationDetected=false;
        updateWeatherBackground(searchedData);
    
});
searchInput.addEventListener('keypress', async(event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission

        const searchedData = searchInput.value;
    if(searchedData!==""){
    await clearSuggestions();
    currentLocationDetected=false;
    updateWeatherBackground(searchedData);
       
    }
    }
});

  
