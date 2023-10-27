import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import constants from "src/constants";
import { getCookie } from "src/utils/cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PORT + "/api",
  timeout: 10000,
  // headers: {
  //   authorization: "Bearer " + getCookie(constants.LOCALSTORAGE.token),
  // },
});

instance.interceptors.request.use(function (config) {
  const token = "Bearer " + getCookie(constants.LOCALSTORAGE.token);
  config.headers.Authorization = token;

  return config;
});

const httpGet = async (url: string, params?: Object) => {
  try {
    const response = await instance(url, {
      params,
    });
    return response.data;
  } catch (error) {
    return {};
  }
};

const httpPost = async (url: string, data: Object) => {
  const response = await instance({
    method: "POST",
    url: url,
    data,
  });
  return response.data;
};

const httpPut = async (url: string, data: Object) => {
  try {
    const response = await instance({
      method: "PUT",
      url: url,
      data,
    });
    return response.data;
  } catch (error: any) {
    toast.error(error?.reponse?.data.message || "Error fetching data");
    return false;
    // return error?.reponse?.data
  }
};

const httpDelete = async (url: string, params?: Object) => {
  try {
    const response = await instance({
      method: "DELETE",
      url: url,
      params,
    });

    return response.data;
  } catch (error: any) {
    toast.error(error?.reponse?.data.message || "Error fetching data");
    return false;
    // return error?.reponse?.data
  }
};

export { httpGet, httpPost, httpPut, httpDelete };
export default instance;
