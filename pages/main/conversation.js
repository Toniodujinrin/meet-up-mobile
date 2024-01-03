import React, { useContext, useEffect } from "react";
import { ConversationContext } from "../../contexts/ConversationContext";
import ConversationComp from "../../components/conversation";
import { View } from "react-native";
import { SocketContext } from "../../contexts/SocketContext";
import Loaders from "react-native-pure-loaders";

const Conversation = ({ navigation, route }) => {
  const id = route.params.id;
  const { getConversation, conversationDetails } =
    useContext(ConversationContext);
  const { joinConversation } = useContext(SocketContext);
  useEffect(() => {
    getConversation(id);
    joinConversation(id);
  }, [id]);

  return (
    <>
      {conversationDetails ? (
        <ConversationComp id={id} />
      ) : (
        <View className="h-screen w-screen flex items-center justify-center bg-black">
          <Loaders.Ellipses size={35} color="#ffffff" />
        </View>
      )}
    </>
  );
};

export default Conversation;
