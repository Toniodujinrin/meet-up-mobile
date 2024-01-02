import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { useContext, useState } from "react";
import { signUpSchema } from "../../validation";
import InputField from "../../components/inputFields";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { SignUpContext } from "../../contexts/SignUpContext";
import Loaders from "react-native-pure-loaders";

const Signup = ({ navigation }) => {
  const { signUp, signUpProcessLoading } = useContext(SignUpContext);
  const [confirmPasswordError, setConfirmPassowrdError] = useState("");
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      onSubmit={async (values) => {
        if (values.confirmPassword !== values.password) {
          setConfirmPassowrdError("confirm password must match password");
        } else {
          setConfirmPassowrdError("");
          delete values.confirmPassword;
          signUp(values);
        }
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
              <Text className="text-white font-medium text-[30px]">
                Create Account
              </Text>
              <Text className="text-mainGray font-normal">
                Create an account and meet up with friends
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

              <InputField
                text={formikProps.values.confirmPassword}
                error={confirmPasswordError}
                type={"password"}
                setText={formikProps.handleChange("confirmPassword")}
                placeholder={"Confirm Password"}
                iconName="lock"
              />
            </View>
            <TouchableWithoutFeedback onPress={formikProps.handleSubmit}>
              <View className="bg-tekhelet h-[40px] justify-center w-[90%]  rounded-lg items-center ">
                {signUpProcessLoading ? (
                  <Loaders.Ellipses size={35} color="#ffffff" />
                ) : (
                  <Text className="text-white text-[20px] font-normal">
                    {"Continue"}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <View className=" flex-row items-center gap-1">
              <Text className={"text-white font-normal"}>Have an account?</Text>
              <Text
                onPress={() => navigation.navigate("Login")}
                className=" text-tekhelet font-normal"
              >
                Log in
              </Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </Formik>
  );
};

export default Signup;
