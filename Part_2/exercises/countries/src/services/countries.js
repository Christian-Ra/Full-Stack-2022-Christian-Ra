import axios from "axios";
const baseCountryUrl = "https://restcountries.com/v3.1";
const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const api_key = process.env.REACT_APP_API_KEY;

const getAllCountries = async () => {
  const request = axios.get(`${baseCountryUrl}/all`);
  const response = await request;
  return response.data;
};

const getCountryByName = async (search) => {
  const request = axios.get(`${baseCountryUrl}/name/${search}`);
  const response = await request;
  return response.data;
};

const getCountryWeatherData = async (capitalLat, capitalLon) => {
  console.log("Searching lat and long with : ", capitalLat, capitalLon);
  const request = axios.get(
    `${baseWeatherUrl}lat=${capitalLat}&lon=${capitalLon}&units=imperial&appid=${api_key}`
  );
  const response = await request;
  return response.data;
};

export default {
  getAllCountries,
  getCountryByName,
  getCountryWeatherData,
};
