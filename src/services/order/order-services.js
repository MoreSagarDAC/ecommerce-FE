import nodeClient from "../../utils/axiosClient.js";

export const saveOrders = async (orderData) => {
  const resp = await nodeClient.post("/v1/order/create", orderData);
  return resp?.data?.data;
};

export const getOrders = async () => {
  const resp = await nodeClient.get("/v1/order");
  return resp?.data?.data || [];
};

export const getOrderById = async (orderId) => {
  const resp = await nodeClient.get(`/v1/order/${orderId}`);
  return resp?.data?.data;
};
