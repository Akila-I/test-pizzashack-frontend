import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

interface OrderItem {
    id: string;
    name: string;
    description: string;
    price: number;
}

const apiUrl = (window as any)?.configs?.apiUrl ?? "/";

export async function getOrders() {
  const options = {
    method: 'GET',
  };

  const response = await performRequest(`${apiUrl}/orders`, options);
  return response as AxiosResponse<OrderItem[]>;
}