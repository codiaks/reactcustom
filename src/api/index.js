import axios from "axios";
import { setupInterceptorsTo } from "./Interceptors";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: { "Content-type": "application/json" },
});

setupInterceptorsTo(instance);

export default async function api({
  url,
  body,
  method,
  params,
  headers = {},
  responseType,
}) {
  const res = await instance({
    data: body,
    method: method,
    url: url,
    params: params,
    headers: headers,
    responseType: responseType,
  });
  if (res) {
    return res.data;
  } else {
    throw Object.assign(new Error("Invalid Response"), { code: 402 });
  }
}
