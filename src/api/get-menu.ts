import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

const apiUrl = '/choreo-apis/wso2-con/pizza-shack-backend/v1';

export async function getMenu() {
  const options = {
    method: 'GET',
  };

  const response = await performRequest(`${apiUrl}/menu`, options);
  console.log('Menu response from API:', response);
  return response?.data as AxiosResponse<any>;
}