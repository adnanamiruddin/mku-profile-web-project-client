import axios from "axios";
import queryString from "query-string";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const privateClientFile = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClientFile.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("actkn")}`,
    },
  };
});

privateClientFile.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClientFile;
