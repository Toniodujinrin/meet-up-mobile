import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";

let baseURL = "https://meetup-server.top/api";
// if (process.env.NODE_ENV == "development") {
//   baseURL = "http://localhost:3003/api";
// }

const client = axios.create({
  baseURL,
});

client.interceptors.request.use(async (config) => {
  try {
    if (await AsyncStorage.getItem("token")) {
      config.headers["authorization"] = await AsyncStorage.getItem("token");
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

const checkForToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    if (decodedToken.isVerified) {
      return typeof token == "string";
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const get = async (route, auth = {}, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return { data: null, noToken: true };
  }
  const res = await client.get(`/${route}`, auth);
  return res;
};

export const post = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return { data: null, noToken: true };
  }
  const res = await client.post(`/${route}`, data);
  return res;
};
export const put = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return { data: null, noToken: true };
  }
  const res = await client.put(`/${route}`, data);
  return res;
};
export const patch = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return { data: null, noToken: true };
  }
  const res = await client.patch(`/${route}`, data);
  return res;
};
export const _delete = async (route, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return { data: null, noToken: true };
  }
  const res = await client.delete(`/${route}`);
  return res;
};
