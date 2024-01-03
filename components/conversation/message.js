import React, { useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserContext } from "../../contexts/UserContext";
import { View, Text } from "react-native";

const Message = ({ body, timeStamp, senderId, status }) => {
  dayjs.extend(relativeTime);
  const { user } = useContext(UserContext);

  return (
    <View
      className={`flex flex-col w-fit max-w-[300px]  ${
        senderId._id == user._id && `self-end items-end`
      }`}
    >
      <View
        className={`${
          senderId._id == user._id
            ? `bg-tekhelet self-end`
            : `bg-midGray self-start`
        } w-fit flex  px-[9px] py-[6px]  rounded-[18px]`}
      >
        <Text className="text-white font-normal">{body}</Text>
      </View>
      <View className="flex flex-row space-x-2">
        <Text className="text-mainGray font-normal self-end flex">{`${dayjs(
          timeStamp
        ).fromNow()}`}</Text>
        {senderId._id == user._id && (
          <Text className="text-tekhelet font-normal">{status}</Text>
        )}
      </View>
    </View>
  );
};

export default Message;
