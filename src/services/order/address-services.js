import nodeClient from "../../utils/axiosClient.js";

export const createNewAddress = async (data) => {
  const resp = await nodeClient.post("v1/address/create", data);
  return resp?.data;
};

export const getAllAddresses = async (userId) => {
  const resp = await nodeClient.get(`v1/address/user/${userId}`);
  return resp?.data?.address;
};
