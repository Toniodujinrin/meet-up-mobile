import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { ConversationContext } from "../../contexts/ConversationContext";
import { SocketContext } from "../../contexts/SocketContext";
import ContactList from "../contacts/contactList";
import { UserContext } from "../../contexts/UserContext";
import { View, Text } from "react-native";
import ButtonMain from "../utils/buttonMain";
import { TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Add = ({ setCurrentDisplay }) => {
  const [selected, setSelected] = useState([]);
  const { userContacts } = useContext(UserContext);
  const { conversationDetails, addToConversation, conversationProcessLoading } =
    useContext(ConversationContext);
  const { groupKey } = useContext(SocketContext);

  const select = (_id) => {
    if (selected.includes(_id)) {
      const _selected = selected.filter((item) => item !== _id);
      setSelected(_selected);
    } else setSelected([_id, ...selected]);
  };

  const handleAdd = () => {
    const payload = {
      conversationId: conversationDetails._id,
      users: selected,
      groupKey,
    };
    addToConversation(payload);
  };

  return (
    <View className="w-full h-full bg-black p-4">
      <View className="flex flex-row justify-between mb-4">
        <View className="flex flex-row space-x-3 items-center">
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                setCurrentDisplay("info");
              }}
            >
              <MaterialCommunityIcons
                color={"#ffffff"}
                size={30}
                name="chevron-left"
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-white font-semibold text-[32px]">Add</Text>
        </View>
        <ButtonMain
          text={"Add"}
          onClick={handleAdd}
          disabled={selected.length == 0}
          loading={conversationProcessLoading}
        />
      </View>

      <ContactList
        select={select}
        contacts={userContacts}
        selected={selected}
      />
    </View>
  );
};

export default Add;
