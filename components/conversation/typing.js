import { ConversationContext } from "../../contexts/ConversationContext";
import MessagePic from "./messagePic";
import { View, Text } from "react-native";
import Loaders from "react-native-pure-loaders";
import { useContext } from "react";

const Typing = ({ user }) => {
  const { conversationDetails } = useContext(ConversationContext);
  const userDetails = conversationDetails.users.find(
    (profile) => profile._id == user
  );

  return (
    <View className="flex flex-row space-x-2 items-start ml-3 ">
      <MessagePic
        defaultColor={userDetails && userDetails.defaultProfileColor}
        displayName={userDetails && userDetails.username}
        image={userDetails && userDetails.profilePic}
      />
      <View className="text-white">
        <View
          className={`bg-midGray  w-[60px] flex  py-[6px] justify-center items-center text-white rounded-[18px]`}
        >
          <Loaders.Ellipses size={20} color="#ffffff" />
        </View>
        <Text style={{ color: userDetails && userDetails.defaultProfileColor }}>
          {userDetails ? userDetails.username : ""}
        </Text>
      </View>
    </View>
  );
};

export default Typing;
