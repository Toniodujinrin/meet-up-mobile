import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import Conversation from "./conversation";
import { useNavigation } from "@react-navigation/native";

const Conversations = ({ searchResults }) => {
  const navigate = useNavigation();
  return (
    <View className="flex w-full flex-col h-full items-center">
      <View className="px-2 w-full flex flex-row mb-2  justify-between items-center ">
        <Text className="text-white font-normal  text-[21px]">
          Conversations
        </Text>

        <TouchableWithoutFeedback
          onPress={() => {
            navigate.navigate("Create");
          }}
        >
          <View className="w-[35px] aspect-square flex items-center justify-center  bg-tekhelet rounded-full ">
            <MaterialCommunityIcons name="pencil" color={"#ffffff"} size={20} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View className={"w-screen "}>
        {searchResults.map((conversation, index) => (
          <View key={index}>
            <Conversation
              _id={conversation._id}
              lastMessage={conversation.lastMessage}
              name={conversation.name}
              defaultConversationColor={conversation.defaultConversationColor}
              image={conversation.conversationPic}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Conversations;
