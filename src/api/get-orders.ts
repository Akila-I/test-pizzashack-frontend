import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

interface OrderItem {
    id: string;
    name: string;
    description: string;
    price: number;
}

const apiUrl = '/choreo-apis/wso2-con/pizza-shack-backend/v1';

export async function getOrders() {
  const options = {
    method: 'GET',
  };

  const response = await performRequest(`${apiUrl}/orders/`, options);
  console.log('Orders response:', response);
  return response as AxiosResponse<OrderItem[]>;
}