import axios from "axios";

export const api = axios.create({
  baseURL: "https://json-server-mypets.herokuapp.com",
});
