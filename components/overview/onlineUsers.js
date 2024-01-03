import React from "react";
import { Text, View, ScrollView } from "react-native";
import ProfilePic from "../utils/profilePic";
import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { UserContext } from "../../contexts/UserContext";

const OnlineUsers = () => {
  const { onlineContacts } = useContext(SocketContext);
  const { userContacts } = useContext(UserContext);

  return (
    <View className=" h-[120px]  w-screen flex flex-col items-center ">
      <Text className="font-normal pl-2  self-start text-white text-[21px] ">
        Online
      </Text>

      <ScrollView
        horizontal={true}
        className="w-screen  flex flex-row space-x-4"
      >
        {userContacts.map((user, index) => (
          <View
            key={index}
            className={`flex items-center ${!index && "pl-2"} ${
              !onlineContacts.includes(user._id) && "hidden"
            }`}
          >
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
