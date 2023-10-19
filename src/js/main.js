// Variáveis
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#consultButton");


//Funções
const displayWeather = (city) => {
    console.log(city);
};


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    displayWeather(city);
  });