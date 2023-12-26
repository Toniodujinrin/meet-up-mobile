import React from "react";

import { View, Text, Image } from "react-native";

const ProfilePic = ({ type, image, defaultColor, displayName }) => {
  return (
    <View>
      {type == "online" && (
        <View className="w-[15px] aspect-square  border-2 border-darkGray rounded-full relative z-30 top-[15px] bg-tekhelet"></View>
      )}
      <View
        style={{ backgroundColor: defaultColor }}
        className="w-[50px] overflow-hidden object-cover aspect-square flex items-center justify-center rounded-full"
      >
        {image && image.url ? (
          <Image
            source={{ uri: image.url }}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <Text className="text-white font-normal text-[24px]">
            {displayName.toUpperCase()[0]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProfilePic;
