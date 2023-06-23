import axios from "axios";
//! Production moved to backend to form single page app, as such, routing can be relative
// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  //   return axios.get(baseUrl);
  //? Since response data is all we care about, we can extract it like so
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  const response = await request;
  return response.data.concat(nonExisting);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  //   return axios.put(`${baseUrl}/${id}`, newObject);
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  getAll,
  create,
  update,
  setToken,
};
