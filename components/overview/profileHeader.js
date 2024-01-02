import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import ProfilePic from "../utils/profilePic";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ProfileHeader = ({ dropDownShowing, setDropDownShowing }) => {
  const navigate = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <View className="h-[80px] w-full py-3 px-3 bg-midGray border-b border-mediumGray flex flex-row items-center justify-between">
      <TouchableWithoutFeedback
        onPress={() => {
          navigate.navigate("Settings");
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
      <TouchableWithoutFeedback
        onPress={() => setDropDownShowing(!dropDownShowing)}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          color={"#ffffff"}
          size={25}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProfileHeader;
