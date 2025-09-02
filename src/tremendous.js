import axios from "axios";

const BASE = "https://testflight.tremendous.com/api/v2";

export function tremendous(apiKey) {
  const http = axios.create({
    baseURL: BASE,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }
  });
  return {
    listProducts: () => http.get("/products").then(r => r.data),
    createOrder: (payload) => http.post("/orders", payload).then(r => r.data),
    generateLink: (rewardId) => http.post(`/rewards/${rewardId}/generate_link`).then(r => r.data)
  };
}
