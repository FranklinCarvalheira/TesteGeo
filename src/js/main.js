//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c64844a72dc81176b80c130cb758a925

// Variáveis
const apiKey = "c64844a72dc81176b80c130cb758a925";
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#consultButton");
const cityElement = document.querySelector("#cityName");
const dataElement = document.querySelector("#currentDate");
const currentElement = document.querySelector("#currentTemp");
const maxElement = document.querySelector("#maxTemp");
const minElement = document.querySelector("#minTemp");
const weatherElement = document.querySelector("#weatherType");
const rainElement = document.querySelector("#rainProbability");
//const moonElement = document.querySelector("#moonPhase");


//Funções

// Função para obter dados climáticos
const getWeather = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
  }

// Função para exibir dados climáticos
const displayWeather = async (city) => {
    const data = await getWeather(city);

    cityElement.innerText = data.name;
    dataElement.innerText = new Date(data.dt * 1000).toLocaleDateString();
    currentElement.innerText = `${data.main.temp} °C`;
    maxElement.innerText = `${data.main.temp_max} °C`;
    minElement.innerText = `${data.main.temp_min} °C`;
    weatherElement.innerText = data.weather[0].description;
    rainElement.innerText = `${data.clouds.all}%`;
};


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    displayWeather(city);
  });