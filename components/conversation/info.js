import React, { useContext, useState } from "react";
import ContactBoxWithoutSelect from "../contacts/contactBoxWithoutSelect";
import { ConversationContext } from "../../contexts/ConversationContext";
import ButtonMain from "../utils/buttonMain";
import DangerButton from "../utils/dangerButton";
import DeletePopUp from "../utils/deletePopUp";
import BigPhoto from "../utils/bigPhoto";
import { View, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Info = ({ setCurrentDisplay }) => {
  const { conversationDetails } = useContext(ConversationContext);
  const [deleteShowing, setDeleteShowing] = useState(false);
  const [deleteAction, setDeleteAction] = useState("");
  return (
    <View className="flex items-center  bg-black h-full ">
      {deleteShowing && (
        <View
          className="absolute flex items-center justify-center"
          style={{
            height: "100%",
            width: "100%",
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
          <DeletePopUp
            deleteAction={deleteAction}
            setDeleteShowing={setDeleteShowing}
          />
        </View>
      )}

      <View
        className={`flex flex-col items-center justify-center p-4 w-full  `}
      >
        <View className="self-start">
          <TouchableWithoutFeedback
            onPress={() => {
              setCurrentDisplay("chat");
            }}
          >
            <MaterialCommunityIcons
              color={"#ffffff"}
              size={30}
              name="chevron-left"
            />
          </TouchableWithoutFeedback>
        </View>
        <View className="flex items-end flex-col">
          <BigPhoto
            changeImage={conversationDetails.type == "group"}
            defaultColor={conversationDetails.defaultConversationColor}
            profilePic={conversationDetails.conversationPic}
            displayName={conversationDetails.name}
          />
        </View>
        <Text
          className={`text-white font-normal text-[24px] ${
            conversationDetails.type == "single" && `mt-4`
          }`}
        >
          {conversationDetails.name}
        </Text>

        <View className="w-full  mt-4">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white font-normal text-[21px]">Members</Text>
            {conversationDetails.type == "group" && (
              <ButtonMain
                text={"Add"}
                onClick={() => setCurrentDisplay("add")}
              />
            )}
          </View>
          <ScrollView className="flex flex-col  mb-[50px] h-[200px]  w-full space-y-3 mt-4 ">
            {conversationDetails.users.map((user, index) => (
              <View key={index} className="w-full">
                <ContactBoxWithoutSelect
                  key={user._id}
                  username={user.username}
                  image={user.profilePic}
                  defaultColor={user.defaultProfileColor}
                  _id={user._id}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="flex flex-col space-y-2 self-start">
          <View>
            <DangerButton
              text={"Leave Conversation"}
              onClick={() => {
                setDeleteShowing(true);
                setDeleteAction("leave");
              }}
              loading={false}
            />
          </View>
          <View>
            <DangerButton
              text={"Delete Conversation"}
              onClick={() => {
                setDeleteShowing(true);
                setDeleteAction("delete");
              }}
              loading={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Info;
