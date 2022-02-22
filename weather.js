#!/usr/bin/env node

import { getArgs } from './helpers/get-args.js';
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { KEY_DICTIONARY, saveKayValue, getKeyValue } from "./services/storege.service.js";
import { getWeather, getIcon } from "./services/api.service.js";

async function saveToken(token) {
  if(!token.length) {
    printError('Did not pass token');
    return;
  }

  try {
    await saveKayValue(KEY_DICTIONARY.token, token);
    printSuccess('The token saved');
  } catch (error) {
    printError(error);
  }
}

async function saveCity(city) {
  if(!city.length) {
    printError('Did not pass city');
    return;
  }

  try {
    await saveKayValue(KEY_DICTIONARY.city, city);
    printSuccess('The city saved');
  } catch (error) {
    printError(error);
  }
}

async function getWeatherHandler() {
  const city = process.env.CITY ?? await getKeyValue(KEY_DICTIONARY.city);

  if (!city) {
    printError('The city isn`t specified. Set the city by command weather -c [CITY]');
    return;
  }

  try {
    const data = await getWeather(city);

    printWeather(data, getIcon(data.weather[0].icon))
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Еhe city is specified incorrectly');
    } else if (e?.response?.status == 401) {
      printError('Еhe token is specified incorrectly');
    } else {
      printError(e.message);
    }
  }
}

async function initCLI() {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
    return;
  }
  if (args.t) {
    await saveToken(args.t);
    return;
  }
  if (args.c) {
    await saveCity(args.c);
    return;
  }

  getWeatherHandler();
}

initCLI();
