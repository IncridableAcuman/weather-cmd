import axios from "axios";
import process from "process";
import { getKeyValue, TOKEN_DICT } from "./storage.service.js";

let env = process.env;

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
};

const getWeather = async (city) => {
  const token = env.TOKEN ?? (await getKeyValue(TOKEN_DICT.token));
  if (!token) {
    //validation token
    throw new Error("Api doesn't exist [TOKEN] for saving token");
  }
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "en",
        units: "metric",
      },
    }
  );
  return response.data; //taking weather about country
};
export { getWeather, getIcon };
