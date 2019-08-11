import axios from "axios";

export const api = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v1/",
  headers: { "X-CMC_PRO_API_KEY": "ca6486f0-9083-4cc3-883c-0fb44371c17d" }
});
