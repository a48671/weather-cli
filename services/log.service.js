import chalk from 'chalk';
import dedent from 'dedent-js';

export function printHelp() {
  console.log(dedent`
    ${chalk.bgCyan('HELP:')}
    Without parameters - print weather;
    -c [CITY] - for save city;
    -h - print help;
    -t [API_KEY] - for save token;
  `);
}

export function printError(error) {
  console.log(`${chalk.bgRed('ERROR:')} ${error}`);
}

export function printSuccess(message) {
  console.log(`${chalk.bgGreen('SUCCESS:')} ${message}`);
}

export function printWeather(res, icon) {
  console.log(dedent`
    ${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
    ${icon}  ${res.weather[0].description}
    Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
    Влажность: ${res.main.humidity}%
    Скорость ветра: ${res.wind.speed}
  `);
};
