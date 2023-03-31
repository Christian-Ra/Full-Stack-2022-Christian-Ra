import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import axios from "axios";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <App notes={notes} />
//   );
// });
//! ^^^ This method has many issues, as we're rendering the entire App component
//! ^^^ Only when we successfully retrieve a response

// const promise = axios.get("http://localhost:3001/notes");
// console.log(promise);
// promise.then((response) => {
//   console.log(response);
// });

//* vvvv Part.A notes, rendering a collection, modules
// const notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];
