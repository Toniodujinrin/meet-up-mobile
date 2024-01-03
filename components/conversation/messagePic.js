import React from "react";
import { View, Image, Text } from "react-native";

const MessagePic = ({ image, defaultColor, displayName }) => {
  return (
    <View
      style={{ backgroundColor: defaultColor }}
      className={`w-[38px] border-2 border-midGray h-[38px] object-contain overflow-hidden flex items-center justify-center rounded-full`}
    >
      {image && image.url ? (
        <Image source={{ uri: image.url }} style={{ width: 38, height: 38 }} />
      ) : (
        <Text className="text-white font-normal text-[24px]">
          {displayName.toUpperCase()[0]}
        </Text>
      )}
    </View>
  );
};

export default MessagePic;
