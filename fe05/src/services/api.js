import axios from "axios";

const apiClient = axios.create({
  //   const apiClient = axios.create({
  //   baseURL:
  //     process.env.NODE_ENV === "production"
  //       ? "http://10.50.1.25:3000"
  //       : "http://10.50.1.25:3000",
  //   //...
  // });
  // baseURL: "http://10.50.1.25:3000",
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
