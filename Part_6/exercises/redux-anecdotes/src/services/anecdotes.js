import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const likeAnecdote = async (id, anecdoteObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, anecdoteObject);
  const response = await request;
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, likeAnecdote };
