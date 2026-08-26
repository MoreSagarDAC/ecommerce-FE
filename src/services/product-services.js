import nodeClient from "../utils/axiosClient";

export const getAllProducts = async ({ limit = 20, cursor = null } = {}) => {
  const params = new URLSearchParams();
  params.append("limit", String(limit));

  if (cursor) {
    params.append("cursor", cursor);
  }

  const response = await nodeClient.get(`/v1/product/all?${params.toString()}`);
  const payload = response?.data?.data ?? response?.data ?? {};

  return {
    products: payload.products || [],
    nextCursor: payload.nextCursor || null,
    hasMore: Boolean(payload.hasMore),
  };
};
