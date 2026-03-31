import { fetchWeather } from "./data.js";

function renderBannerInfo(data) {
  const city = document.querySelector("#climaAtualInfo h2");
  const date = document.querySelector("#climaAtualInfo p");
  const temp = document.querySelector("#temperatura p");

  city.textContent = `${data.city}, ${data.country}`;
  date.textContent = data.date;
  temp.textContent = `${data.temperature}°`;
}

function renderDayInfo(data){
  const list = document.querySelector(".stats ul");

  list.innerHTML = "";

  const items = [
    { label: "Feels Like", value: `${data.feelsLike}°` },
    { label: "Humidity", value: `${data.humidity}%` },
    { label: "Wind", value: `${data.wind} km/h` },
    { label: "Precipitation", value: `${data.precipitation} mm` }
  ];

  items.forEach(item => {
    const li = document.createElement("li");

    li.innerHTML = `
      <p>${item.label}</p>
      <p><strong>${item.value}</strong></p>
    `;

    list.appendChild(li);
  });
}

function renderDaily(dailyData){
  const list = document.querySelector(".daily ul");

  list.innerHTML = "";

  dailyData.forEach(day => {
    const li = document.createElement("li");

    li.innerHTML = `
      <p>${day.day}</p>
      <img class="tempIcon" src="${day.icon}">
      <section class="tempStatus">
        <p>${day.max}°</p>
        <p>${day.min}°</p>
      </section>
    `;

    list.appendChild(li);
  });
}

function renderHourly(hourlyData){
  const list = document.querySelector(".hourly ul");

  list.innerHTML = "";

  hourlyData.forEach(hour => {
    const li = document.createElement("li");

    li.innerHTML = `
      <section class="linhaHoras">
        <p>
          <img class="hourIcon" src="${hour.icon}" style="width:24px; height:24px;">
          ${hour.time}
        </p>
        <p>${hour.temp}°</p>
      </section>
    `;

    list.appendChild(li);
  });
}

function orquestradora(data){
    renderBannerInfo(data);
    renderDayInfo(data);
    renderDaily(data.daily);
    renderHourly(data.hourly);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchWeather("Braganca Paulista");
    orquestradora(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
});

const searchInput = document.querySelector("#searchInput"); 
const searchButton = document.querySelector("nav .button"); 

async function buscarCidade() {
  const city = searchInput.value;

  if (!city) return;

  try {
    const data = await fetchWeather(city);
    orquestradora(data);
  } catch (error) {
    console.error("Erro:", error);
  }
}

searchButton.addEventListener("click", buscarCidade);