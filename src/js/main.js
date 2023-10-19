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
const savedCitiesSelect = document.querySelector("#savedCities");

const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([0, 0]),
      zoom: 2,
    }),
  });

// Array para armazenar as cidades já consultadas
const savedCitiesArray = [];

// Função para adicionar cidade à lista de cidades salvas
function addCityToSavedList(city) {
    if (!savedCitiesArray.includes(city)) {
      savedCitiesArray.push(city);
      const option = document.createElement("option");
      option.value = city;
      option.text = city;
      savedCitiesSelect.appendChild(option);
    }
  }

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

    if (data.name) {
        cityElement.innerText = data.name;
        dataElement.innerText = new Date(data.dt * 1000).toLocaleDateString();
        currentElement.innerText = `${data.main.temp} °C`;
        maxElement.innerText = `${data.main.temp_max} °C`;
        minElement.innerText = `${data.main.temp_min} °C`;
        weatherElement.innerText = data.weather[0].description;
        rainElement.innerText = `${data.clouds.all}%`;
    
        map.getView().setCenter(ol.proj.fromLonLat([data.coord.lon, data.coord.lat]));
        map.getView().setZoom(10);

        addCityToSavedList(city);

        } else {
    const errorPopup = document.querySelector("#errorPopup");
    const popupMessage = document.querySelector("#popupMessage");
    popupMessage.innerText = "Cidade não encontrada";
    errorPopup.style.display = "block";
    const closePopupButton = document.querySelector("#closePopupButton");
    closePopupButton.addEventListener("click", () => {
      errorPopup.style.display = "none";
    });
  }
};


//Eventos

// Evento para selecionar cidades já consultadas
savedCitiesSelect.addEventListener("change", (e) => {
    const selectedCity = e.target.value;
    if (selectedCity && savedCitiesArray.includes(selectedCity)) {
      displayWeather(selectedCity);
    }
  });

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    displayWeather(city);
  });

  cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
      displayWeather(city);
    }
  });