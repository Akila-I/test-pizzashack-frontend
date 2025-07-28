import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

const apiUrl = '/choreo-apis/wso2-con/pizza-shack-backend/v1';

export async function getOrders() {
  const options = {
    method: 'GET',
  };

  const response = await performRequest(`${apiUrl}/order/`, options);
  console.log('Orders response from API:', response);
  return response as AxiosResponse<any>;
}

export async function deleteOrder(orderId: string) {
  const options = {
    method: 'DELETE',
  };

  const response = await performRequest(`${apiUrl}/order/${orderId}`, options);
  console.log(`Delete order response for ${orderId}:`, response);
  return response?.data as AxiosResponse<any>;
}

interface MenuItem {
    code: string;
    name: string;
    description: string;
    price: number;
}

export async function addOrder(firstName: string | undefined, lastName: string | undefined, item: MenuItem) {
  const orderBody = {
    customerName: `${firstName} ${lastName}`,
    items: [item.name],
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(orderBody),
  };

  const response = await performRequest(`${apiUrl}/order/`, options);
  console.log('Add order response:', response);
  return response as AxiosResponse<any>;
}