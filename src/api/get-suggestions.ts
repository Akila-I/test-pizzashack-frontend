import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function getSuggestions(input: string) {
  const options = {
    method: 'POST',
    data: { 
      "preferences": input
    },
  };

  const response = await performRequest(`${apiUrl}/ai/suggest`, options);
  return response as AxiosResponse<string>;
}