import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

const Menu = ({ options }) => {
  return (
    <View
      className={` bg-midGray w-[200px]   rounded-lg border-mainGray  border   text-white  `}
    >
      {options.map((option, index) => (
        <TouchableWithoutFeedback key={index} onPress={option.onClick}>
          <View
            className={` ${
              index !== options.length - 1 && `border-b `
            }cursor-pointer flex flex-row items-center justify-between border-mainGray p-2`}
          >
            <Text
              className={`font-normal ${
                option.dangerIcon ? ` text-red-600` : `text-white`
              } `}
            >
              {option.name}
            </Text>
            <MaterialCommunityIcons
              color={`${option.dangerIcon ? `#dc2626` : `#ffffff`}`}
              size={20}
              name={option.iconName}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

export default Menu;
