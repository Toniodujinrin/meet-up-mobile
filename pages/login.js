import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { useContext } from "react";
import { signUpSchema } from "../validation";
import InputField from "../components/inputFields";
import { Formik } from "formik";

const Login = () => {
  //   const { authenticate, authenticationProcessLoading } = useContext(UserContext);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, actions) => {
        //authentication code
      }}
      validationSchema={signUpSchema}
    >
      {(formikProps) => (
        <View
          className={"flex-1 items-center  w-screen p-2 justify-center gap-y-8"}
        >
          <View className="items-center gap-2 w-full ">
            <Text className="text-white font-medium text-[30px]">Log in</Text>
            <Text className="text-mainGray font-normal">
              Log into your Meetup account
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
          </View>
          <TouchableWithoutFeedback onPress={formikProps.handleSubmit}>
            <View className="bg-tekhelet h-[40px] justify-center w-full  rounded-lg items-center ">
              <Text className="text-white text-[20px] font-normal">
                {"Continue"}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View className=" flex-row items-center gap-1">
            <Text className={"text-white font-normal"}>No account?</Text>
            <Text
              onPress={() => console.log("route to sign up page")}
              className=" text-tekhelet font-normal"
            >
              Sign Up
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
