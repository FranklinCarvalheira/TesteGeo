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