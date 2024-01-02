import { createContext } from "react";
import "core-js/stable/atob";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TokenContext = createContext();

const TokenContextProvider = ({ children }) => {
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
  const checkForTokenAndNotVerify = async () => {
    const token = await AsyncStorage.getItem("token");
    return typeof token == "string";
  };

  return (
    <TokenContext.Provider value={{ checkForToken, checkForTokenAndNotVerify }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
