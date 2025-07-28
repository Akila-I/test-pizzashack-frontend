import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

interface OrderItem {
    id: string;
    name: string;
    description: string;
    price: number;
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function getOrders() {
  const options = {
    method: 'GET',
  };

  const response = await performRequest(`${apiUrl}/orders`, options);
  return response as AxiosResponse<OrderItem[]>;
}