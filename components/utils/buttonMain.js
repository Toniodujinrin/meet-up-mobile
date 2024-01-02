import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import Loaders from "react-native-pure-loaders";

const ButtonMain = ({ text, disabled, onClick, loading }) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onClick}>
      <View className="py-2 w-fit px-4 border-2 border-tekhelet rounded-[5px]  font-semibold text-tekhelet">
        {loading ? (
          <Loaders.Ellipses size={20} color="#6140c2" />
        ) : (
          <Text className="text-tekhelet font-normal">{text}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonMain;
