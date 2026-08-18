import nodeClient from "../utils/axiosClient";

export const getAllProducts = async () => {
  const response = await nodeClient.get("/v1/product/all");
  return response?.data;
};
