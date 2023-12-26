import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import ProfilePic from "../utils/profilePic";

const user = {
  username: "Toni",
  defaultProfileColor: "#66A2AB",
  profilePic: null,
};
const ProfileHeader = () => {
  return (
    <View className="h-[80px] w-full py-3 px-3 bg-midGray border-b border-mediumGray flex flex-row items-center justify-between">
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("navigate to settings page");
        }}
      >
        <View className=" flex flex-row cursor-pointer items-center space-x-2">
          <ProfilePic
            defaultColor={user.defaultProfileColor}
            displayName={user.username}
            image={user.profilePic}
          />
          <View>
            <Text className="text-white font-bold text-[20px]">
              {user.username}
            </Text>
            <Text className="text-mainGray font-normal text-[16px]">
              My Account
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <MaterialCommunityIcons
        name="dots-vertical"
        color={"#ffffff"}
        size={25}
      />
    </View>
  );
};

export default ProfileHeader;
