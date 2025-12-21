import nodeClient from "../utils/axiosClient";

export const registerUser = async (userData) => {
  const response = await nodeClient.post("/users/v1/register", userData);
  return response;
};

export const loginUser = async (credentials) => {
  const response = await nodeClient.post("/users/v1/login", credentials);
  return response?.data;
};

export const getUserProfile = async (userId) => {
  return await nodeClient.get(`/users/v1/${userId}`);
};

export const updateUserProfile = async (userId, userData) => {
  return nodeClient.put(`/users/v1/${userId}`, userData);
};
