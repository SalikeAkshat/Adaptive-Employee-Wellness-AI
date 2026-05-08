// import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000/api";

// export const getLatestPrediction = async () => {
//   try {
//     const res = await axios.get(`${API_BASE}/predictions/latest`);
//     return res.data.data;
//   } catch (err) {
//     console.error("Prediction fetch error:", err);
//     return null;
//   }
// };

// export const sendChatMessage = async (message) => {
//   try {
//     const res = await axios.post(`${API_BASE}/chat/respond`, { message });
//     return res.data.response;
//   } catch (err) {
//     console.error("Chat error:", err);
//     return "Sorry, I’m having trouble connecting right now.";
//   }
// };

import axios from "axios";

const API_BASE = "http://127.0.0.1:5000"; // Flask backend

export const getLatestPrediction = async () => {
  return await axios.get(`${API_BASE}/latest-prediction`);
};

export const sendChatMessage = async (message) => {
  return await axios.post(`${API_BASE}/chat`, { message });
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE}/login`, credentials);
};
