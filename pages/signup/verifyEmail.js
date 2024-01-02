import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { useContext, useState } from "react";
import { verifyEmailSchema } from "../../validation";
import InputField from "../../components/inputFields";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { SignUpContext } from "../../contexts/SignUpContext";
import Loaders from "react-native-pure-loaders";
import { useNavigation } from "@react-navigation/native";

const VerifyEmail = () => {
  const navigate = useNavigation();
  const { verifyEmail, signUpProcessLoading, resendCode, resendOtpLoading } =
    useContext(SignUpContext);
  return (
    <Formik
      initialValues={{ otp: "" }}
      onSubmit={async (values) => {
        verifyEmail(values);
      }}
      validationSchema={verifyEmailSchema}
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
                Verify Email
              </Text>
              <Text className="text-mainGray font-normal">
                Type in the OTP that was sent to your email
              </Text>
            </View>
            <View className="w-[90%] items-center justify-center">
              <InputField
                text={formikProps.values.otp}
                error={formikProps.errors.otp}
                setText={formikProps.handleChange("otp")}
                placeholder={"OTP"}
                iconName={"form-textbox-password"}
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

            {!resendOtpLoading && (
              <Text
                onPress={() => resendCode()}
                className=" text-tekhelet font-normal my-2"
              >
                Resend Code
              </Text>
            )}

            <View className=" flex-row items-center gap-1">
              <Text className={"text-white font-normal"}>Go back to</Text>
              <Text
                onPress={() => navigate.navigate("Login")}
                className=" text-tekhelet font-normal"
              >
                Login
              </Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </Formik>
  );
};

export default VerifyEmail;
