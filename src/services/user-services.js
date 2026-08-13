import nodeClient from "../utils/axiosClient";

export const registerUser = async (userData) => {
  const response = await nodeClient.post("/v1/user/register", userData);
  return response;
};

export const loginUser = async (credentials) => {
  const response = await nodeClient.post("/v1/user/login", credentials);
  return response?.data;
};

export const getUserProfile = async (userId) => {
  return await nodeClient.get(`/v1/user/${userId}`);
};

export const updateUserProfile = async (userId, userData) => {
  return nodeClient.put(`/v1/user/${userId}`, userData);
};
