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
        hourly: data.forecast.forecastday[0].hour.map(hour => ({
            time: new Date(hour.time).getHours() + ":00",
            temp: hour.temp_c
        }))
    }
    
};

