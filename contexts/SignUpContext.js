import { createContext, useContext, useState } from "react";
import { post } from "../api";
import { TokenContext } from "./TokenContext";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignUpContext = createContext();

const SignUpContextProvider = ({ children }) => {
  const navigate = useNavigation();
  const [signUpProcessLoading, setSignUpProcessLoaading] = useState(false);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);
  const { checkForTokenAndNotVerify } = useContext(TokenContext);

  const signUp = async (payload) => {
    try {
      setSignUpProcessLoaading(true);
      const res = await post("users", payload, false);
      const token = res.headers.authorization;
      await AsyncStorage.setItem("token", token);
      Toast.show({
        type: "success",
        text1: "Success",
      });
      navigate.navigate("VerifyEmail");
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not signup",
      });
    } finally {
      setSignUpProcessLoaading(false);
    }
  };

  const verifyEmail = async (payload) => {
    if (!checkForTokenAndNotVerify()) {
      Toast.show({
        type: "error",
        text1: "could not verify email",
      });
      return navigate.navigate("Login");
    }
    try {
      setSignUpProcessLoaading(true);
      const res = await post("users/verifyEmail", payload, false);
      const token = res.headers.authorization;
      await AsyncStorage.setItem("token", token);
      Toast.show({
        type: "success",
        text1: "Email Verified",
      });
      navigate.navigate("VerifyAccount");
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not verify email",
      });
    } finally {
      setSignUpProcessLoaading(false);
    }
  };

  const verifyAccount = async (payload) => {
    if (!checkForTokenAndNotVerify()) {
      Toast.show({
        type: "error",
        text1: "could not verify email",
      });
      return navigate.navigate("Login");
    }
    try {
      setSignUpProcessLoaading(true);
      const res = await post("users/verifyAccount", payload, false);
      const token = res.headers.authorization;
      await AsyncStorage.setItem("token", token);
      Toast.show({
        type: "success",
        text1: "Account Verified",
      });
      navigate.navigate("Login");
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not verify account",
      });
    } finally {
      setSignUpProcessLoaading(false);
    }
  };

  const resendCode = async () => {
    if (!checkForTokenAndNotVerify()) {
      Toast.show({
        type: "error",
        text1: "could not verify email",
      });
      return navigate.navigate("Login");
    }
    try {
      setResendOtpLoading(true);
      await post("users/resendOtp", {}, false);
      Toast.show({
        type: "success",
        text1: "new code sent",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not send new code",
      });
    } finally {
      setResendOtpLoading(false);
    }
  };

  return (
    <SignUpContext.Provider
      value={{
        verifyAccount,
        verifyEmail,
        signUp,
        resendCode,
        signUpProcessLoading,
        resendOtpLoading,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContextProvider;
