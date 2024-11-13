import axios from "axios";
import queryString from "query-string";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
