import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import InputField from "../../components/inputFields";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { verifyAccountSchema } from "../../validation";

const VerifyAccount = () => {
  //   const { authenticate, authenticationProcessLoading } = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        username: "",
        phone: "",
        lastName: "",
        firstName: "",
        bio: "",
      }}
      onSubmit={async (values, actions) => {}}
      validationSchema={verifyAccountSchema}
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
                Verify Account
              </Text>
              <Text className="text-mainGray font-normal">
                Verify your account by filling your details
              </Text>
            </View>
            <View className="w-[90%] items-center justify-center">
              <InputField
                iconName={"account"}
                text={formikProps.values.firstName}
                placeholder={"First Name"}
                setText={formikProps.handleChange("firstName")}
                error={formikProps.errors.firstName}
              />
              <InputField
                iconName={"account"}
                text={formikProps.values.lastName}
                placeholder={"Last Name"}
                setText={formikProps.handleChange("lastName")}
                error={formikProps.errors.lastName}
              />
              <InputField
                iconName={"account"}
                text={formikProps.values.username}
                placeholder={"Username"}
                setText={formikProps.handleChange("username")}
                error={formikProps.errors.username}
              />
              <InputField
                iconName={"phone"}
                text={formikProps.values.phone}
                placeholder={"Phone Number"}
                setText={formikProps.handleChange("phone")}
                error={formikProps.errors.phone}
              />

              <InputField
                iconName={"book"}
                text={formikProps.values.bio}
                placeholder={"Bio"}
                setText={formikProps.handleChange("bio")}
                error={formikProps.errors.bio}
              />
            </View>
            <TouchableWithoutFeedback onPress={formikProps.handleSubmit}>
              <View className="bg-tekhelet h-[40px] justify-center w-[90%]  rounded-lg items-center ">
                <Text className="text-white text-[20px] font-normal">
                  {"Continue"}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View className=" flex-row items-center gap-1">
              <Text className={"text-white font-normal"}>Go back to</Text>
              <Text
                onPress={() => console.log("route to sign up page")}
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

export default VerifyAccount;
