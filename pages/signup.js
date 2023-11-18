import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { useContext, useState } from "react";
import { signUpSchema } from "../validation";
import InputField from "../components/inputFields";
import { Formik } from "formik";

const Signup = () => {
  //   const { authenticate, authenticationProcessLoading } = useContext(UserContext);
  const [confirmPasswordError, setConfirmPassowrdError] = useState("");
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      onSubmit={async (values, actions) => {
        if (values.confirmPassword !== values.password) {
          setConfirmPassowrdError("confirm password must match password");
        } else {
          setConfirmPassowrdError("");

          //authentication code
        }
      }}
      validationSchema={signUpSchema}
    >
      {(formikProps) => (
        <View
          className={"flex-1 items-center  w-screen p-2 justify-center gap-y-8"}
        >
          <View className="items-center gap-2 w-full ">
            <Text className="text-white font-medium text-[30px]">
              Create Account
            </Text>
            <Text className="text-mainGray font-normal">
              Create an account and meet up with friends
            </Text>
          </View>
          <View className="w-full items-center justify-center">
            <InputField
              text={formikProps.values.email}
              error={formikProps.errors.email}
              setText={formikProps.handleChange("email")}
              placeholder={"Email"}
              iconName={"user"}
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
            <View className="bg-tekhelet h-[40px] justify-center w-full  rounded-lg items-center ">
              <Text className="text-white text-[20px] font-normal">
                {"Continue"}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View className=" flex-row items-center gap-1">
            <Text className={"text-white font-normal"}>Have an account?</Text>
            <Text
              onPress={() => console.log("route to sign up page")}
              className=" text-tekhelet font-normal"
            >
              Log in
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Signup;
