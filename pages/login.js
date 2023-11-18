import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { useState, useContext } from "react";
import { signUpSchema } from "../validation";
import InputField from "../components/inputFields";

const Login = () => {
  //   const { authenticate, authenticationProcessLoading } =
  //   useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [errors, setErrors] = useState({ password: "", email: "" });

  const handleSubmit = async (e) => {
    //e.preventDefault();
    const noErrors = { password: "", email: "" };
    const validatorObject = { password: "", email: "" };
    let error;
    try {
      const { err } = signUpSchema.validateSync(
        { email, password },
        { abortEarly: false }
      );
    } catch (ee) {
      error = ee.value;
      console.log(Object.keys(ee.inner));
    }
    console.log(error);
    // if (error) {
    //   for (let item of error) {
    //     if (!validatorObject[item.path[0]])
    //       validatorObject[item.path[0]] = item.message;
    //   }
    // }
    // setErrors(validatorObject);
    // if (JSON.stringify(noErrors) == JSON.stringify(validatorObject)) {
    //   console.log("authentication");
    // }
  };
  return (
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
          text={email}
          error={"Email not valid"}
          setText={setEmail}
          placeholder={"Email"}
          name={"user"}
        />
        <InputField
          text={password}
          //error={"Password not valid"}
          type={"password"}
          setText={setPassoword}
          placeholder={"Password"}
          name="lock"
        />
      </View>
      <TouchableWithoutFeedback
        onPress={(e) => {
          handleSubmit(e);
        }}
      >
        <View className="bg-tekhelet h-[40px] justify-center w-full  rounded-lg items-center ">
          <Text className="text-white text-[20px] font-normal">
            {"Continue"}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;
