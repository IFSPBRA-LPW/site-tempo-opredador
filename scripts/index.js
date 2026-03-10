import { previsao   } from "./data.js";

console.log(previsao);


function renderBannerInfo(data){
    const banner = document.getElementById("climaAtualInfo");
    const cidade = banner.querySelector("h2");
    cidade.textContent = data.city;
}

function renderDayInfo(data){

}

function renderDaily(dailyData){

}

function renderHourly(hourlyData){
    
}

function orquestradora(data){
    renderBannerInfo(data);
    renderDayInfo(data);
    renderDaily(data.daily);
    renderHourly(data.hourly);
}

document.addEventListener("DOMContentLoaded", () => {
    orquestradora(previsao);
});