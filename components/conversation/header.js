import React from "react";
import ProfilePic from "../utils/profilePic";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ConversationContext } from "../../contexts/ConversationContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableWithoutFeedback, Text } from "react-native";
//import { SocketContext } from "../../contexts/socketContext";

const Header = ({ setCurrentDisplay }) => {
  const navigate = useNavigation();
  dayjs.extend(relativeTime);
  const { conversationDetails } = useContext(ConversationContext);
  //const { onlineGroupUsers, leaveConversation } = useContext(SocketContext);

  return (
    <View className="bg-midGray w-full h-[80px] flex border-b border-mediumGray flex-row items-center justify-between p-4 ">
      <View className="flex flex-row space-x-3 items-center">
        <TouchableWithoutFeedback
          onPress={() => {
            navigate.goBack();
          }}
        >
          <MaterialCommunityIcons
            color={"#ffffff"}
            size={30}
            name="chevron-left"
          />
        </TouchableWithoutFeedback>

        <ProfilePic
          image={conversationDetails.conversationPic}
          defaultColor={conversationDetails.defaultConversationColor}
          displayName={conversationDetails.name}
        />
        <View
          className="cursor-pointer"
          onClick={() => setCurrentDisplay("info")}
        >
          <Text className="text-white font-normal">
            {conversationDetails.name}
          </Text>
          {/* {conversationDetails.type == "single" && (
            <Text
              className={`${
                onlineGroupUsers.length <= 1 ? `text-mainGray` : `text-tekhelet`
              }`}
            >{`${
              onlineGroupUsers.length <= 1
                ? `Last seen : ${dayjs(conversationDetails.lastSeen).fromNow()}`
                : "online"
            }`}</Text>
          )} */}
        </View>
      </View>

      <View className="flex flex-row gap-4 ">
        {conversationDetails.type == "single" && (
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                console.log("make call");
                // makeCall();
                // setCurrentDisplay("call");
              }}
            >
              <MaterialCommunityIcons
                name="video"
                color={"#ffffff"}
                size={25}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
        <View>
          <TouchableWithoutFeedback onPress={() => setCurrentDisplay("info")}>
            <MaterialCommunityIcons
              name="dots-vertical"
              color={"#ffffff"}
              size={25}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default Header;
