import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableWithoutFeedback, View } from "react-native";
const InputBox = ({
  value,
  setValue,
  handleSendMessage,
  handleTypingStart,
}) => {
  return (
    <View className="w-full  border-mediumGray flex flex-row space-x-3 justify-center items-center h-[100px]">
      <TextInput
        value={value}
        multiline={true}
        onKeyPress={() => handleTypingStart()}
        className=" mr-2  text-white focus:outline-none rounded-[25px] p-3 pl-4 w-[70%] h-[50px] bg-mediumGray"
        onChangeText={setValue}
        placeholderTextColor={"#ffffff"}
        placeholder="New message..."
      />

      <TouchableWithoutFeedback
        disabled={value.length == 0}
        onPress={() => {
          handleSendMessage();
        }}
      >
        <View className="h-[45px] bg-tekhelet rounded-full aspect-square flex items-center justify-center">
          <MaterialCommunityIcons size={25} name="send" color={"#ffffff"} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default InputBox;
