import React, { useContext } from "react";
import ProfilePic from "../utils/profilePic";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";

const ContactBoxWithoutSelect = ({ username, image, _id, defaultColor }) => {
  const {
    user,
    pendingReceived,
    userContacts,
    pendingSent,
    sendRequest,
    acceptRequest,
  } = useContext(UserContext);

  const contacts = userContacts.map((contact) => {
    return contact._id;
  });
  const received = pendingReceived.map((contact) => {
    return contact._id;
  });
  const sent = pendingSent.map((contact) => {
    return contact._id;
  });
  return (
    <View className="bg-midGray cursor-pointer rounded-md  w-full  justify-between p-3 h-[80px] items-center flex flex-row ">
      <View className="flex flex-row space-x-3 items-center">
        <ProfilePic
          image={image}
          defaultColor={defaultColor}
          displayName={username}
        />
        <View className="flex flex-col">
          <Text className="text-white">{username}</Text>
          <Text className="text-mainGray">{_id}</Text>
          {sent.includes(_id) && (
            <Text className="text-tekhelet ">pending</Text>
          )}
        </View>
      </View>
      {!contacts.includes(_id) &&
        !received.includes(_id) &&
        !sent.includes(_id) &&
        user._id !== _id && (
          <TouchableWithoutFeedback
            onPress={() => {
              sendRequest(_id);
            }}
          >
            <MaterialCommunityIcons
              color={"#ffffff"}
              name="plus-circle-outline"
              size={25}
            />
          </TouchableWithoutFeedback>
        )}

      {received.includes(_id) && (
        <TouchableWithoutFeedback
          onPress={() => {
            acceptRequest(_id);
          }}
        >
          <MaterialCommunityIcons
            name="checkbox-multiple-marked-circle"
            size={25}
            color={"#ffffff"}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default ContactBoxWithoutSelect;
