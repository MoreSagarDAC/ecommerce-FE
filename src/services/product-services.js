import nodeClient from "../utils/axiosClient";

export const getAllProducts = async ({ limit = 20, cursor = null } = {}) => {
  console.log("limit : ", limit, cursor);
  const params = new URLSearchParams();

  params.append("limit", limit);

  if (cursor) {
    params.append("cursor", cursor);
  }

  const response = await nodeClient.get(`/v1/product/all?${params.toString()}`);

  return response?.data;
};
