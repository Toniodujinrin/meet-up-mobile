import React from "react";
import ProfilePic from "../utils/profilePic";
import { TouchableHighlight, View, Text } from "react-native";

const ContactBoxWithSelect = ({
  username,
  image,
  _id,
  selected,
  select,
  defaultColor,
}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        select(_id);
      }}
    >
      <View className="bg-midGray cursor-pointer rounded-md lg:w-[300px] w-full space-x-3 p-3 h-[70px] items-center flex flex-row">
        <View
          className={`w-[20px] mr-3 h-[20px] ${
            selected.includes(_id) && "bg-white border-0"
          }  border-mainGray border rounded-full`}
        ></View>
        <ProfilePic
          image={image}
          defaultColor={defaultColor}
          displayName={username}
        />
        <View>
          <Text className="text-white font-normal">{username}</Text>
          <Text className="text-mainGray font-normal">{_id}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ContactBoxWithSelect;
