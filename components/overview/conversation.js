import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import ProfilePic from "../utils/profilePic";

const Conversation = ({
  _id,
  lastMessage,
  key,
  name,
  defaultConversationColor,
  image,
}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        console.log("navigate to ", _id);
      }}
    >
      <View
        //   onClick={() => {
        //     location.pathname != `/conversation/${_id}` &&
        //       navigate(`/main/conversation/${_id}`, { replace: true });
        //   }}
        className="w-full  px-4 cursor-pointer border-b  border-mediumGray space-x-4 flex flex-row  items-center justify-between h-[80px]"
      >
        <View className="flex flex-row items-center space-x-4">
          <ProfilePic
            image={image}
            defaultColor={defaultConversationColor}
            displayName={name}
          />
          <View>
            <Text className="text-white text-[18px] font-normal">{name}</Text>

            {/* code for underlying text conversation overview */}
            {/* <small className="text-mainGray">
                {lastMessage && user && (
                  <div>
                    {user._id == lastMessage.senderId ? (
                      <div className="flex flex-row items-center gap-2">
                        <img
                          className="w-[20px] aspect-square"
                          src={`${
                            lastMessage.status == "delivered"
                              ? `../../sendIconPurple.svg`
                              : `../../sendIconOutlinedPurple.svg`
                          }`}
                          alt=""
                        />
                        <p className="text-[16px]">
                          {lastMessage.status == "delivered"
                            ? "delivered"
                            : "received"}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center gap-2">
                        <img
                          className="w-[18px] aspect-square"
                          src={`${
                            lastMessage.status == "delivered"
                              ? `../../newMessageIcon.svg`
                              : `../../readMessageIcon.svg`
                          }`}
                          alt=""
                        />
                        <p className="text-[16px]">
                          {lastMessage.status == "delivered"
                            ? "new Message"
                            : "opened"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </small> */}
          </View>
        </View>

        {/* {amount > 0 && (
            <div className="w-[26px] h-[21px] bg-tekhelet rounded-[20px] flex items-center justify-center text-white">
              {amount}
            </div>
          )} */}
      </View>
    </TouchableHighlight>
  );
};

export default Conversation;
