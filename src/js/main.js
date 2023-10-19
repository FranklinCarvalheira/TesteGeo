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
const moonElement = document.querySelector("#moonPhase");


//Funções

// Função para obter dados climáticos
const getWeather = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data);
  }

const displayWeather = (city) => {
    getWeather(city);
};


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    displayWeather(city);
  });