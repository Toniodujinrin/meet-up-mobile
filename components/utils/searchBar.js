import React from "react";
import { View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchBar = ({ value, setValue, placeholder }) => {
  return (
    <View className="bg-midGray   border-mediumGray border h-[50px] w-full rounded-xl p-3  flex flex-row items-center justify-between ">
      <MaterialCommunityIcons name="magnify" color={"white"} size={20} />

      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
        placeholderTextColor={"#ffffff"}
        className="w-11/12 border-none  text-white focus:outline-none"
      ></TextInput>
    </View>
  );
};

export default SearchBar;
