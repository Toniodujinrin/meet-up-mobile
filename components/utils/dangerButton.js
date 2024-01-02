import React from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import Loaders from "react-native-pure-loaders";

const DangerButton = ({ text, onClick, loading }) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View className="w-[200px] py-2 flex items-center justify-center border-2 border-red-600 rounded-[5px]">
        {loading ? (
          <Loaders.Ellipses size={20} color="#dc2626" />
        ) : (
          <Text className="font-normal text-red-600">{text}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DangerButton;
