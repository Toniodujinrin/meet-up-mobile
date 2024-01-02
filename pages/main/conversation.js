import React, { useContext, useEffect } from "react";
import { ConversationContext } from "../../contexts/ConversationContext";
import ConversationComp from "../../components/conversation";
import { View } from "react-native";

const Conversation = ({ navigation, route }) => {
  const id = route.params.id;
  const { getConversation, conversationDetails } =
    useContext(ConversationContext);
  // const { joinConversation } = useContext(SocketContext);
  useEffect(() => {
    getConversation(id);
    // joinConversation(id);
  }, [id]);

  return (
    <>
      {conversationDetails ? (
        <ConversationComp />
      ) : (
        <View className="h-screen w-screen bg-black"></View>
      )}
    </>
  );
};

export default Conversation;
