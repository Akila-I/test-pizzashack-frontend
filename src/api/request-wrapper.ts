import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';


export const performRequest = async (url: string, options: AxiosRequestConfig<any> | undefined) => {

  try {
    return await axios(url, options);
  } catch (error: AxiosError | any) {
    if (error.response && error.response.status === 401) {
      // Session has expired. Initiate a login.
      window.location.href = '/auth/login';
    } else {
      throw error;
    }
  }
};
