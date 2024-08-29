import getArgs from "./helper/args.js";
import process from "process";
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  getKeyValue,
  TOKEN_DICT,
} from "./services/storage.service.js";
import { getIcon, getWeather } from "./services/api.service.js";
import { log } from "console";
let env = process.env;
const saveToken = async (token) => {
  if (!token.length) {
    printError("Token doesn't exist");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICT.token, token);
    printSuccess("Token just has saved");
  } catch (error) {
    printError(error.message);
  }
};
const saveCity = async (city) => {
  if (!city.length) {
    printError("City doesn't exist");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICT.city, city);
    printSuccess("City just has saved");
  } catch (error) {
    printError(error.message);
  }
};
const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICT.city);
    const response = await getWeather(city);
    printWeather(response, getIcon(response.weather[0].icon));
  } catch (error) {
    if (error?.response?.status == 404) {
      printError("City not found!");
    } else if (error?.response?.status == 401) {
      printError("Invalid token");
    } else {
      printError(error.message);
    }
  }
};
const startCLI = () => {
  const args = getArgs(process.argv);
  //console.log(args);
  if (args.h) {
    //help
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    //token
    return saveToken(args.t);
  }
  return getForcast();
};
startCLI();
