import React from "react";
import DangerButton from "./dangerButton";
// import { ConversationContext } from "../../../../contexts/conversationContext";
// import { UserContext } from "../../../../contexts/UserContext";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback, View, Text } from "react-native";
const DeletePopUp = ({ setDeleteShowing, deleteAction }) => {
  //   const { leaveConversation, deleteConversation, conversationProcessLoading } =
  //     useContext(ConversationContext);
  //   const { deleteAccount, deleteAccountLoading } = useContext(UserContext);
  return (
    <View className="w-[90%] flex items-center  flex-col p-3 h-[250px] absolute bg-black z-30  border border-midGray rounded-md">
      <View className=" flex self-end cursor-pointer">
        <TouchableWithoutFeedback onPress={() => setDeleteShowing(false)}>
          <MaterialCommunityIcons color={"white"} name="close" size={20} />
        </TouchableWithoutFeedback>
      </View>

      {deleteAction == "leave" && (
        <Text className="text-white text-[21px] font-normal my-8 text-center">
          Are you sure you want to leave this conversation, you wiNll not be
          able to enter join again untill someone adds you back
        </Text>
      )}
      {deleteAction == "account" && (
        <Text className="text-white text-[21px] my-8 text-center">
          Are you sure you want to delete your account, This action is
          irreversible !
        </Text>
      )}
      {deleteAction == "delete" && (
        <Text className="text-white text-[21px] my-8 text-center">
          Are you sure you want to delete this conversation? This action is
          irreversible.
        </Text>
      )}
      {deleteAction == "leave" && (
        <DangerButton
          //loading={conversationProcessLoading}
          onClick={
            () => console.log("leave conversation")
            // leaveConversation()
          }
          text={"Leave Conversation"}
        />
      )}
      {deleteAction == "account" && (
        <DangerButton
          //loading={deleteAccountLoading}
          onClick={() => {
            console.log("delete account");
            // deleteAccount();
          }}
          text={"Delete Account"}
        />
      )}

      {deleteAction == "delete" && (
        <DangerButton
          text={"Delete Conversation"}
          onClick={() => {
            console.log("delete conversation");
            //deleteConversation();
          }}
          //loading={conversationProcessLoading}
        />
      )}
    </View>
  );
};

export default DeletePopUp;
