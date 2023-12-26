import React from "react";
import { View, Text } from "react-native";

const BigPhoto = ({ defaultColor, displayName, profilePic }) => {
  return (
    <View
      style={{ backgroundColor: defaultColor }}
      className={` w-[150px] bg-black flex items-center justify-center border-4 border-midGray aspect-square overflow-hidden rounded-full`}
    >
      {profilePic && profilePic.url ? (
        <Image
          source={{ uri: profilePic.url }}
          style={{ width: 150, height: 150 }}
        />
      ) : (
        <Text className="text-white lg:text-[60px] text-[45px] font-bold">
          {displayName.toUpperCase()[0]}
        </Text>
      )}
    </View>
  );
};

export default BigPhoto;
