import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1";

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getCountryByName = (search) => {
  console.log("request with, ", search);
  const request = axios.get(`${baseUrl}/name/${search}`);
  return request.then((response) => response.data);
};

export default { getAllCountries, getCountryByName };
