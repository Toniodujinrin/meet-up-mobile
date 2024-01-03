import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MessagePic from "./messagePic";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { View, Text } from "react-native";

const ConversationMessage = ({ body, timeStamp, senderId, status }) => {
  dayjs.extend(relativeTime);
  const { user } = useContext(UserContext);

  return (
    <View
      className={`flex flex-row space-x-3 items-start   ${
        senderId._id == user._id && `self-end`
      }`}
    >
      {senderId._id !== user._id && (
        <MessagePic
          displayName={senderId.username}
          defaultColor={senderId.defaultProfileColor}
          image={senderId.profilePic}
        />
      )}

      <View
        className={`flex flex-col ${
          senderId._id == user._id && ` items-end`
        }  `}
      >
        <View
          className={`${
            senderId._id == user._id
              ? `bg-tekhelet self-end`
              : `bg-midGray self-start`
          } w-fit max-w-[200px] flex  px-[9px] py-[6px] text-white rounded-[18px]`}
        >
          <Text className="text-white font-normal">{body}</Text>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-mainGray font-normal self-end flex">{`${dayjs(
            timeStamp
          ).fromNow()}`}</Text>
          {senderId._id == user._id ? (
            <Text className="text-tekhelet font-normal">{status}</Text>
          ) : (
            <Text
              style={{ color: senderId.defaultProfileColor }}
              className="font-normal"
            >
              {senderId.username}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ConversationMessage;
