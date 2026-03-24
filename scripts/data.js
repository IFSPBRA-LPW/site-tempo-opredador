import { API_KEY   } from "./config.js";

export async function fetchWeather(city) {
const response = await fetch(
`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`,
);
if (!response.ok) {
throw new Error("Erro ao buscar dados da API");
}

const data = await response.json();

return weatherData(data);
}


function weatherData(data) {
    return{
        city: data.location.name,
        country: data.location.country,
        date: data.forecast.forecastday[0].date,
        icon: data.current.condition.icon,
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        precipitation: data.current.precip_mm,
        daily: [
            { day: "Tue", icon: "🌧", max: 20, min: 14 },
            { day: "Wed", icon: "🌧", max: 21, min: 15 },
            { day: "Thu", icon: "☀", max: 24, min: 14 },
            { day: "Fri", icon: "⛈", max: 25, min: 13 },
            { day: "Sat", icon: "⛈", max: 21, min: 15 },
            { day: "Sun", icon: "☁", max: 25, min: 16 },
            { day: "Mon", icon: "🌫", max: 24, min: 15 },
        ],
        hourly: [
            { time: "3 PM", temp: 20 },
            { time: "4 PM", temp: 20 },
            { time: "5 PM", temp: 20 },
            { time: "6 PM", temp: 19 },
            { time: "7 PM", temp: 18 },
            { time: "8 PM", temp: 18 },
            { time: "9 PM", temp: 17 },
            { time: "10 PM", temp: 17 },
        ],
    }
    
};

