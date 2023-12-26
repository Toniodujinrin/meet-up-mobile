import React from "react";
import { Text, View, ScrollView } from "react-native";
import ProfilePic from "../utils/profilePic";

const OnlineUsers = () => {
  const users = [
    {
      username: "Toni",
      defaultProfileColor: "#66A2AB",
      profilePic: null,
    },
    {
      username: "Lola",
      defaultProfileColor: "#ABCDEF",
      profilePic: null,
    },
    {
      username: "Fola",
      defaultProfileColor: "#12340f",
      profilePic: null,
    },
    {
      username: "Seun",
      defaultProfileColor: "#5ed78a",
      profilePic: null,
    },
    {
      username: "Toni",
      defaultProfileColor: "#66A2AB",
      profilePic: null,
    },
    {
      username: "Lola",
      defaultProfileColor: "#ABCDEF",
      profilePic: null,
    },
    {
      username: "Fola",
      defaultProfileColor: "#12340f",
      profilePic: null,
    },
    {
      username: "Seun",
      defaultProfileColor: "#5ed78a",
      profilePic: null,
    },
  ];
  return (
    <View className=" h-[120px] pl-2 w-screen flex flex-col items-center ">
      <Text className="font-normal  self-start text-white text-[21px] ">
        Online
      </Text>

      <ScrollView
        horizontal={true}
        className="w-screen pl-3 flex flex-row space-x-4"
      >
        {users.map((user, index) => (
          <View key={index} className="flex items-center">
            <ProfilePic
              displayName={user.username}
              defaultColor={user.defaultProfileColor}
              image={user.profilePic}
              type={"online"}
            />
            <Text className="text-white font-normal">{user.username}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OnlineUsers;
