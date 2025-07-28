import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

interface MenuItem {
    code: string;
    name: string;
    description: string;
    price: number;
}

const apiUrl = (window as any)?.configs?.apiUrl ?? "/";

export async function getMenu() {
  const options = {
    method: 'GET',
  };

  const response = await performRequest(`${apiUrl}/menu`, options);
  return response as AxiosResponse<MenuItem[]>;
}