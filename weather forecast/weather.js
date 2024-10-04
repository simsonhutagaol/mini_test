import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const url = `http://api.openweathermap.org/data/2.5/forecast?q=Jakarta&units=metric&appid=${process.env.WEATHER_API_KEY}`;

(async function getWeatherForecast() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== "200") {
      console.error("Error Message", data.message);
      return;
    }

    console.log("Weather Forecast:");

    const forecasts = [];
    const dates = new Set();

    for (const item of data.list) {
      const date = item.dt_txt.split(" ")[0];
      if (!dates.has(date)) {
        dates.add(date);
        forecasts.push(item);
      }
      if (forecasts.length === 6) break;
    }
    // console.log(forecasts);

    forecasts.forEach((item) => {
      const date = new Date(item.dt_txt);
      // console.log(date);
      const dateString = date.toLocaleDateString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      console.log(`${dateString}: ${item.main.temp} °C`);
    });
  } catch (error) {
    console.error("Error Message:", error);
  }
})();
