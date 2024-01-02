import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Details from "./details";
import { useNavigation } from "@react-navigation/native";
import WebCam from "./webcam";

const SettingsComp = () => {
  const navigate = useNavigation();
  const [webcamShowing, setWebcamShowing] = useState(false);
  return (
    <View className="h-screen w-screen flex-1 bg-black">
      <View className="flex flex-row items-center px-2 pt-2 w-full">
        <TouchableWithoutFeedback
          onPress={() => {
            navigate.goBack();
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
      {!webcamShowing ? (
        <Details setWebcamShowing={setWebcamShowing} />
      ) : (
        <WebCam setWebcamShowing={setWebcamShowing} />
      )}
    </View>
  );
};

export default SettingsComp;
