import { join } from 'path';
import { homedir } from 'os';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

export const KEY_DICTIONARY = {
  token: 'token',
  city: 'city'
}

export async function saveKayValue(key, value) {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);

    data = JSON.parse(file.toString());
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
}

export async function getKeyValue(key) {

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    return JSON.parse(file.toString())[key];
  }

  return undefined;
}

async function isExist(path) {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
}
