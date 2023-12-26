import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import Conversation from "./conversation";

const Conversations = ({ searchResults }) => {
  return (
    <View className="flex w-full flex-col h-full items-center">
      <View className="px-2 w-full flex flex-row h-[10%] justify-between items-center ">
        <Text className="text-white font-normal  text-[21px]">
          Conversations
        </Text>

        <TouchableWithoutFeedback
          onPress={() => {
            console.log("navigate to add page");
          }}
        >
          <View className="w-[35px] aspect-square flex items-center justify-center  bg-tekhelet rounded-full ">
            <MaterialCommunityIcons name="pencil" color={"#ffffff"} size={20} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal={false} className={"w-screen h-[90%]"}>
        {searchResults.map((conversation, index) => (
          <Conversation
            _id={conversation._id}
            lastMessage={conversation.lastMessage}
            key={index}
            name={conversation.name}
            defaultConversationColor={conversation.defaultConversationColor}
            image={conversation.conversationPic}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Conversations;
