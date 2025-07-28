import type { AxiosResponse } from "axios";
import { performRequest } from "./request-wrapper";

const apiUrl = '/choreo-apis/wso2-con/pizza-shack-backend/v1';

export async function getSuggestions(input: string) {
  const options = {
    method: 'POST',
    data: { 
      "preference": input
    },
  };

  const response = await performRequest(`${apiUrl}/ai/suggest`, options);
  console.log('Suggestions response from API:', response);
  return response as AxiosResponse<any>;
}