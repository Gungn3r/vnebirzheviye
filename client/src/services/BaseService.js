import axios from "axios";

export class BaseService {
  constructor() {
    this.accessToken = localStorage.getItem("token") || "";

    this.instance = axios.create({
      baseURL: "http://localhost:5001/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.accessTokenInterceptor();
  }

  accessTokenInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.accessToken || localStorage.getItem("token");
        const tokenBearer = `JWT ${token}`;

        config.headers.Authorization = tokenBearer;

        return config;
      },
      (err) => Promise.reject(err)
    );
  }
}
