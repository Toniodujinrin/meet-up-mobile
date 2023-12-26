import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

let baseURL = "https://meetup-server.top/api";
// if (process.env.NODE_ENV == "development") {
//   baseURL = "http://localhost:3003/api";
// }

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  try {
    if (AsyncStorage.getItem("token")) {
      config.headers["authorization"] = AsyncStorage.getItem("token");
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
    return false;
  }
};

export const test = async () => {
  try {
    const res = await axios.get(
      "https://meetup-server.top/api/users/todujinrin@gmail.com"
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const get = async (route, auth = {}, shouldCheckForToken = true) => {
  try {
    if (shouldCheckForToken) {
      if (!(await checkForToken())) return console.log("return to login");
    }
    const res = await client.get(`/${route}`, auth);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const post = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return console.log("return to login");
  }
  const res = await client.post(`/${route}`, data);
  return res;
};
export const put = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return console.log("return to login");
  }
  const res = await client.put(`/${route}`, data);
  return res;
};
export const patch = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return console.log("return to login");
  }
  const res = await client.patch(`/${route}`, data);
  return res;
};
export const _delete = async (route, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!(await checkForToken())) return console.log("return to login");
  }
  const res = await client.delete(`/${route}`);
  return res;
};
