import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001"
});

export async function sendMessage(number, message) {
  const res = await API.post("/send-message", { number, message });
  return res.data;
}
