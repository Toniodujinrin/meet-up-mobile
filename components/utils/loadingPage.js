import React from "react";
import { View, Text } from "react-native";
import Loaders from "react-native-pure-loaders";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../assets/logo.svg";
const LoadingPage = () => {
  return (
    <View className="w-screen h-screen flex  justify-center items-center bg-black">
      <View className="flex  items-center ">
        <Logo width={70} height={70} />
        <Text className="text-tekhelet font-normal text-[26px]">Meetup</Text>
      </View>
      <Loaders.Ellipses size={35} color="#6140c2" />

      <View className=" bg-midGray mt-4  rounded-lg flex flex-row justify-evenly items-center space-x-3 w-fit  p-2 ">
        <MaterialCommunityIcons size={20} color={"#ffffff"} name="lock" />
        <Text className="text-white font-normal ">End to End Encrypted</Text>
      </View>
    </View>
  );
};

export default LoadingPage;
