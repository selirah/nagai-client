import axios, { AxiosResponse } from 'axios';

const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ENDPOINT_PROD
    : process.env.REACT_APP_API_ENDPOINT_DEV;

export async function callApiGet(path: string): Promise<AxiosResponse> {
  return await axios.get(`${API_ENDPOINT}/api/v1/${path}`);
}

export async function callApiPost(
  path: string,
  payload: any
): Promise<AxiosResponse> {
  return await axios.post(`${API_ENDPOINT}/api/v1/${path}`, payload);
}

export async function callApiPut(
  path: string,
  payload: any,
  param: any
): Promise<AxiosResponse> {
  return await axios.put(`${API_ENDPOINT}/api/v1/${path}/${param}`, payload);
}

export async function callApiDelete(
  path: string,
  param: number
): Promise<AxiosResponse> {
  return await axios.delete(`${API_ENDPOINT}/api/v1/${path}/${param}`);
}
