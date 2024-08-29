import chalk from "chalk";
import dedent from "dedent-js";
const printSuccess = (message) => {
  console.log(chalk.bgGreen("SUCCESS") + " " + message);
};
const printError = (error) => {
  console.log(chalk.bgRed("ERROR") + " " + error);
};
const printHelp = () => {
  console.log(dedent`
        ${chalk.bgCyan("HELP")}
        -s [CITY] for saving
        -t [TOKEN] for saving token
        -h for help
        `);
};
const printWeather = (response, icon) => {
  console.log(dedent`
  ${chalk.bgYellowBright("WEATHER")} City weather ${response.name}
  ${icon}  ${response.weather[0].description} 
  Temperature:${response.main.temp} (feels like) ${response.main.feels_like}
  Humidity:${response.main.humidity}%
  Wind:${response.wind.speed} km/h

  `);
};
export { printError, printHelp, printSuccess, printWeather };
