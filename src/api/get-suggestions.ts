import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

const apiUrl = (window as any)?.configs?.apiUrl ?? "/";

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