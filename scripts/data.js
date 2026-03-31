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
    const currentHour = new Date(data.location.localtime).getHours();
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
        daily: data.forecast.forecastday.map(day => ({
            day: new Date(day.date).toLocaleDateString("pt-BR", { weekday: "short" }),
            icon: `https:${day.day.condition.icon}`,
            max: day.day.maxtemp_c,
            min: day.day.mintemp_c
        })),

        hourly: data.forecast.forecastday[0].hour.slice(currentHour, currentHour + 8).map(hour => ({
            icon: `https:${hour.condition.icon}`,
            time: hour.time.split(" ")[1],
            temp: Math.round(hour.temp_c),
        }))
    };
}


