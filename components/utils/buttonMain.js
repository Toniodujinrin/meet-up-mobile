import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";

const ButtonMain = ({ text, disabled, onClick }) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onClick}>
      <View className="py-2 w-fit px-4 border-2 border-tekhelet rounded-[5px]  font-semibold text-tekhelet">
        <Text className="text-tekhelet font-normal">{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonMain;
