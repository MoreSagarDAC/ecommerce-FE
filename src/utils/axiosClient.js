import axios from "axios";

export const BASEURL = "http://localhost:8080";

export const BYPASS_ERROR_URLS = [
  // Add URLs that should bypass error handling
  // Example: "/auth/logout",
  // "/service/private/v0/oms/save/v1",
  // "/service/public/v0/users/has/draft",
];

let apiStack = {};

const apiInstance = () => {
  const api = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const uri = config.url.split("?")[0];

    if (config.headers["cancelPrev"]) {
      if (apiStack[uri]) {
        const controller = apiStack[uri];
        controller.abort();
      }
      apiStack[uri] = new AbortController();
      return { ...config, signal: apiStack[uri].signal };
    }

    return { ...config };
  });

  api.interceptors.response.use(
    (response) => {
      const uri = response?.config?.url.split("?")[0];
      Object.keys(apiStack).forEach(
        (key) => key === uri && delete apiStack[key]
      );
      return response;
    },
    (error) => {
      if (error.message !== "canceled") console.error(error);
      //return null;
    }
  );

  return api;
};

const nodeClient = apiInstance();

export default nodeClient;
