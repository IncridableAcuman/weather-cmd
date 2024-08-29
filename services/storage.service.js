import os from "os";
import path from "path";
import fs from "fs";

const filePath = path.join(os.homedir(), "weather-data.json"); //your computer in path creating
//weather-data.json becouse token will save forexample {token:123}

const TOKEN_DICT={
  city:'city',
  token:'token'
}

const saveKeyValue = async (key, value) => {
  //This code was saved your token to data object
  let data = {};
  if (await isExist(filePath)) {
    //researching file your os path
    const file = await fs.promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await fs.promises.writeFile(filePath, JSON.stringify(data)); //creating file
  
};
const getKeyValue = async key => {
  //creating token and saving
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};
const isExist = async path => {
  //validation file
  try {
    await fs.promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};
export { saveKeyValue, getKeyValue , TOKEN_DICT};
