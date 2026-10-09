import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";
export const BASEURL = "http://localhost";
//http://localhost:5000 -- used when nginx not used.

export const BYPASS_ERROR_URLS = [
  // Add URLs that should bypass error handling
  // Example: "/auth/logout",
  // "/service/private/v0/oms/save/v1",
  // "/service/public/v0/users/has/draft",
];

const REFRESH_TOKEN_URL = "/v1/user/refresh-token";

const isRefreshRequest = (config) =>
  config?.url?.includes(REFRESH_TOKEN_URL);

const isAccessTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiresAtMs = payload.exp * 1000;
    const refreshBufferMs = 2000;

    return expiresAtMs <= Date.now() + refreshBufferMs;
  } catch {
    return true;
  }
};

const isSessionAuthError = (error) => {
  if (error.response?.status !== 401) return false;

  const code = error.response?.data?.code;

  return (
    code === "TOKEN_EXPIRED" ||
    code === "INVALID_TOKEN" ||
    code === "AUTH_REQUIRED" ||
    code === "REFRESH_TOKEN_EXPIRED"
  );
};

const clearSessionAndRedirect = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
  store.dispatch(logout());

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

let apiStack = {};
let refreshPromise = null;

const refreshSession = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const refreshApiUrl = `${BASEURL}${REFRESH_TOKEN_URL}`;

  console.log("[Refresh Token] API called:", {
    method: "POST",
    url: refreshApiUrl,
    endpoint: REFRESH_TOKEN_URL,
  });

  if (!refreshToken) {
    throw new Error("Refresh token is missing");
  }

  const response = await axios.post(
    refreshApiUrl,
    { refreshToken },
    { withCredentials: true },
  );

  const accessToken = response?.data?.token;
  const nextRefreshToken = response?.data?.refreshToken;

  if (!accessToken) {
    throw new Error("Access token missing from refresh response");
  }

  sessionStorage.setItem("token", accessToken);

  if (nextRefreshToken) {
    sessionStorage.setItem("refreshToken", nextRefreshToken);
  }

  console.log("[Refresh Token] Success. New access token stored.");

  return accessToken;
};

const getValidAccessToken = async () => {
  const currentToken = sessionStorage.getItem("token");

  if (currentToken && !isAccessTokenExpired(currentToken)) {
    return currentToken;
  }

  if (!sessionStorage.getItem("refreshToken")) {
    return currentToken;
  }

  if (!refreshPromise) {
    refreshPromise = refreshSession().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

const apiInstance = () => {
  const api = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
  });

  api.interceptors.request.use(async (config) => {
    const uri = config.url.split("?")[0];

    if (!isRefreshRequest(config)) {
      try {
        const token = await getValidAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("[Refresh Token] Failed before API call:", error);
        clearSessionAndRedirect();
        return Promise.reject(error);
      }
    }

    if (config.headers["cancelPrev"]) {
      if (apiStack[uri]) {
        const controller = apiStack[uri];
        controller.abort();
      }
      apiStack[uri] = new AbortController();
      config.signal = apiStack[uri].signal;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      const uri = response?.config?.url.split("?")[0];
      Object.keys(apiStack).forEach(
        (key) => key === uri && delete apiStack[key],
      );
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.message === "canceled") {
        return Promise.reject(error);
      }

      if (!isSessionAuthError(error) || !originalRequest) {
        if (error.message !== "canceled") console.error(error);
        return Promise.reject(error);
      }

      if (isRefreshRequest(originalRequest) || originalRequest._retry) {
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      const errorCode = error.response?.data?.code;

      if (errorCode !== "TOKEN_EXPIRED") {
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      console.log("[Refresh Token] Access token expired on API:", {
        method: originalRequest.method?.toUpperCase(),
        url: originalRequest.url,
        status: error.response?.status,
        code: errorCode,
      });

      originalRequest._retry = true;

      try {
        const newAccessToken = refreshPromise
          ? await refreshPromise
          : await getValidAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearSessionAndRedirect();
        return Promise.reject(refreshError);
      }
    },
  );

  return api;
};

const nodeClient = apiInstance();

export default nodeClient;
