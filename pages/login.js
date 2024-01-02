import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { signUpSchema } from "../validation";
import InputField from "../components/inputFields";
import { Formik } from "formik";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loaders from "react-native-pure-loaders";

const Login = ({ navigation }) => {
  const { authenticate, authenticationProcessLoading } =
    useContext(UserContext);

  const navigateToMainIfTokenValid = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.isVerified) {
        navigation.navigate("Main");
      }
    }
  };
  useEffect(() => {
    navigateToMainIfTokenValid();
  }, []);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        authenticate(values);
      }}
      validationSchema={signUpSchema}
    >
      {(formikProps) => (
        <LinearGradient
          className="flex-1 w-full h-full"
          colors={["#1d1438", "#120c22"]}
        >
          <View
            className={
              "flex-1 items-center  w-screen p-2 justify-center gap-y-8"
            }
          >
            <View className="items-center gap-2 w-full ">
              <Text className="text-white font-medium text-[30px]">Log in</Text>
              <Text className="text-mainGray font-normal">
                Log into your Meetup account
              </Text>
            </View>
            <View className="w-[90%] items-center justify-center">
              <InputField
                text={formikProps.values.email}
                error={formikProps.errors.email}
                setText={formikProps.handleChange("email")}
                placeholder={"Email"}
                iconName={"account"}
              />
              <InputField
                text={formikProps.values.password}
                error={formikProps.errors.password}
                type={"password"}
                setText={formikProps.handleChange("password")}
                placeholder={"Password"}
                iconName="lock"
              />
            </View>
            <TouchableWithoutFeedback onPress={formikProps.handleSubmit}>
              <View className="bg-tekhelet h-[40px] justify-center w-[90%]  rounded-lg items-center ">
                {!authenticationProcessLoading ? (
                  <Text className="text-white text-[20px] font-normal">
                    {"Continue"}
                  </Text>
                ) : (
                  <Loaders.Ellipses size={35} color="#ffffff" />
                )}
              </View>
            </TouchableWithoutFeedback>

            <View className=" flex-row items-center gap-1">
              <Text className={"text-white font-normal"}>No account?</Text>
              <Text
                onPress={() => navigation.navigate("Signup")}
                className=" text-tekhelet font-normal"
              >
                Sign Up
              </Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </Formik>
  );
};

export default Login;
