import axios from 'axios';
import { KEY_DICTIONARY, getKeyValue } from "./storege.service.js";

export function getIcon(iconCode) {
  switch (iconCode.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};

export async function getWeather(city) {
  const token = process.env.TOKEN ?? await getKeyValue(KEY_DICTIONARY.token);

  if (!token) {
    throw Error('The token isn`t specified. Set the token by command weather -t [TOKEN]');
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      appid: token,
      units: 'metric',
      lang: 'ru',
      'q': city
    }
  });

  return data
}
