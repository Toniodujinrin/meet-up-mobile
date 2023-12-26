import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Details from "./details";

const SettingsComp = () => {
  return (
    <View className="h-screen w-screen flex-1">
      <View className="flex flex-row items-center px-2 pt-2 w-full">
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("go back");
          }}
        >
          <MaterialCommunityIcons
            color={"#ffffff"}
            size={30}
            name="chevron-left"
          />
        </TouchableWithoutFeedback>

        <Text className="text-white text-[24px] font-normal ">Settings</Text>
      </View>
      <Details />
    </View>
  );
};

export default SettingsComp;
