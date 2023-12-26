import { View, TextInput, Text, Image } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const InputField = ({ error, text, placeholder, setText, type, iconName }) => {
  return (
    <View className={`w-full ${error && "mb-3"} space-y-2 `}>
      <View
        className={`border-[0.1px] ${
          error ? `border-red-600` : `border-[#7a7c80]`
        } w-full p-3  space-x-2 border  rounded-xl flex flex-row justify-between items-center`}
      >
        <MaterialCommunityIcons name={iconName} size={20} color={`#ffffff`} />

        <TextInput
          secureTextEntry={type == "password"}
          textContentType={type}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={"#ffffff"}
          className="  placeholder-white w-11/12 h-full   border-none text-white focus:outline-none"
        ></TextInput>
      </View>
      <Text className=" text-red-600">{error}</Text>
    </View>
  );
};

export default InputField;
