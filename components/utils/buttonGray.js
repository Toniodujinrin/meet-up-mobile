import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import Loaders from "react-native-pure-loaders";

const ButtonGray = ({ text, disabled, onClick, icon, loading }) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onClick}>
      <View className="py-2 w-[200px] border-2 bg-mediumGray rounded-[5px] flex flex-row items-center justify-center font-semibold text-white">
        {loading ? (
          <Loaders.Ellipses size={20} color="#ffffff" />
        ) : (
          <>
            <MaterialCommunityIcons name={icon} size={20} color={"#ffffff"} />
            <Text className="text-white ml-3 font-normal">{text}</Text>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonGray;
