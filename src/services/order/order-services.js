import nodeClient from "../../utils/axiosClient.js";

export const saveOrders = async (orderData) => {
  const resp = await nodeClient.post("/v1/order/create", orderData);
  return resp?.data?.data;
};
