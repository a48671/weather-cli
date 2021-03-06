import axios from 'axios';
import { KEY_DICTIONARY, getKeyValue } from "./storege.service.js";

export function getIcon(iconCode) {
  switch (iconCode.slice(0, -1)) {
    case '01':
      return 'âī¸';
    case '02':
      return 'đ¤ī¸';
    case '03':
      return 'âī¸';
    case '04':
      return 'âī¸';
    case '09':
      return 'đ§ī¸';
    case '10':
      return 'đĻī¸';
    case '11':
      return 'đŠī¸';
    case '13':
      return 'âī¸';
    case '50':
      return 'đĢī¸';
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
