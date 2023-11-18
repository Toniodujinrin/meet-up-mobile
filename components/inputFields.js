import { View, TextInput, Text, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const InputField = ({ error, text, placeholder, setText, type, name }) => {
  return (
    <View className="w-full space-y-2 mb-4">
      <View
        className={`border-[0.1px] ${
          error ? `border-red-600` : `border-[#7a7c80]`
        } w-full p-3  space-x-2 border-2  rounded-xl flex flex-row justify-between items-center`}
      >
        <FontAwesome5
          name={name}
          size={20}
          color={`${error ? `red` : `#7a7c80`}`}
        />

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
