import axios from "axios";

const client = axios.create({
  baseURL: "https://shared-canvas-f08f0-default-rtdb.firebaseio.com/",
});

export default client;
