import axios from "axios";
import { store } from "../store";
import { login, logout } from "../store/slices/authReducer";
import { ApiConstants, BASE_URL } from "./ApiConstants";

const onRequest = (config) => {
  const rootState = store.getState();
  const globalState = rootState.auth || {};
  if (globalState.accessToken && config.headers) {
    config.headers.Authorization = "Bearer " + globalState.accessToken;
  }
  console.log(config, "config");
  return config;
};

const onRequestError = (error) => {
  console.log(error, "req err");
  return Promise.reject(error);
};

const onResponse = (response) => {
  console.log(response, "response");
  return response;
};

const onResponseError = async (error) => {
  console.log(error, "error");
  if (error.response && error.response.status === 401) {
    const rootState = store.getState();
    const globalState = rootState.auth;
    const { dispatch } = store;
    try {
      const url = BASE_URL + ApiConstants.UserRefresh;
      //refresh token expiry
      const now = Math.ceil(Date.parse(new Date())) / 1000; //UTC epoch timestamp in milliseconds
      if (globalState.refreshTokenExpiry > now) {
        let res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${globalState.refreshToken}`,
          },
        });

        const { data } = res;
        if (data?.refreshToken?.value && data?.accessToken?.value) {
          const dispatchLogin = new Promise((resolve, reject) => {
            dispatch(login(data));
            resolve();
          });
          dispatchLogin.then(() => {
            error.config.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken.value}`;
            return axios(error.config);
          });
        }
      } else {
        // refresh token expired logout
        // toast.error('Token expired!', { toastId: 'logut_error' });
        dispatch(logout());
      }
    } catch (error) {
      if (checkStatus(error)) {
        // toast.error( 'Token expired!',{toastId : "logut_error"});
        dispatch(logout());
        // unthorised error handler to be exicuted here
      }
    }
    // unthorised error handler to be exicuted here
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

const checkStatus = (error) => {
  return !!(
    error?.response?.status === 401 ||
    error?.response?.status === 403 ||
    error?.response?.statusCode === 401 ||
    error?.response?.statusCode === 403 ||
    error?.statusCode === 401 ||
    error?.statusCode === 403 ||
    error?.status === 401 ||
    error?.status === 403
  );
};
