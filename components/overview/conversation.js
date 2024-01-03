import React, { useContext, useState, useEffect } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import ProfilePic from "../utils/profilePic";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { SocketContext } from "../../contexts/SocketContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Conversation = ({
  _id,
  lastMessage,
  key,
  name,
  defaultConversationColor,
  image,
}) => {
  const navigate = useNavigation();
  const { user } = useContext(UserContext);
  const { notifications } = useContext(SocketContext);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const notification = notifications.find(
      (notification) => notification.conversationId == _id
    );
    if (notification) setAmount(notification.amount);
    else setAmount(0);
  }, [notifications]);
  return (
    <TouchableHighlight
      onPress={() => {
        navigate.navigate("Conversation", { id: _id });
      }}
    >
      <View className="w-full  px-4 cursor-pointer border-b  border-mediumGray space-x-4 flex flex-row  items-center justify-between h-[80px]">
        <View className="flex flex-row items-center space-x-4">
          <ProfilePic
            image={image}
            defaultColor={defaultConversationColor}
            displayName={name}
          />
          <View>
            <Text className="text-white text-[18px] font-normal">{name}</Text>

            {/* code for underlying text conversation overview */}
            <View className="mt-1">
              {lastMessage && user && (
                <View>
                  {user._id == lastMessage.senderId ? (
                    <View className="flex flex-row items-center space-x-2">
                      {lastMessage.status == "delivered" ? (
                        <MaterialCommunityIcons
                          name="send"
                          color={"#6140c2"}
                          size={18}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="send-outline"
                          color={"#6140c2"}
                          size={18}
                        />
                      )}
                      <Text className="text-[16px] font-normal text-mainGray">
                        {lastMessage.status == "delivered"
                          ? "delivered"
                          : "received"}
                      </Text>
                    </View>
                  ) : (
                    <View className="flex flex-row items-center space-x-2">
                      {amount > 0 ? (
                        <MaterialCommunityIcons
                          color={"#6140c2"}
                          name="message"
                          size={18}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          color={"#6140c2"}
                          name="message-reply-outline"
                          size={18}
                        />
                      )}
                      <Text className="text-[16px] font-normal text-mainGray">
                        {amount > 0 ? "new Message" : "opened"}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>

        {amount > 0 && (
          <View className="w-[26px] h-[21px] bg-tekhelet rounded-[20px] flex items-center justify-center">
            <Text className="text-white font-normal">{amount}</Text>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
};

export default Conversation;
