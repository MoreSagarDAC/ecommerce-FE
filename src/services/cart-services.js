import nodeClient from "../utils/axiosClient";

export const addToCart = async (payload) => {
  const resp = await nodeClient.post("v1/cart/addToCart", payload);
  return resp?.data;
};
