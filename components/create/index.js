import React, { useState, useContext } from "react";
import { Text, View, TouchableWithoutFeedback, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContactList from "../contacts/contactList";
import ButtonMain from "../utils/buttonMain";
import InputField from "../inputFields";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { ConversationContext } from "../../contexts/ConversationContext";

const CreateComp = () => {
  const navigate = useNavigation();
  const { createConversation, conversationProcessLoading } =
    useContext(ConversationContext);
  const { userContacts } = useContext(UserContext);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");

  const select = (_id) => {
    let _selected = [...selected];
    if (selected.includes(_id)) {
      _selected = _selected.filter((item) => item !== _id);
    } else {
      _selected.push(_id);
    }
    setSelected(_selected);
  };

  const handleCreate = () => {
    let payload = {
      users: selected,
    };
    if (selected.length == 1) {
      payload.type = "single";
    } else {
      payload.type = "group";
      payload.name = name;
    }
    createConversation(payload);
  };
  return (
    <View className="h-scree w-screen flex-1 bg-darkGray">
      <View className="w-full flex-row items-center justify-between py-3  px-3">
        <View className="flex flex-row">
          <TouchableWithoutFeedback
            onPress={() => {
              navigate.goBack();
            }}
          >
            <MaterialCommunityIcons
              color={"#ffffff"}
              size={30}
              name="chevron-left"
            />
          </TouchableWithoutFeedback>

          <Text className="text-white text-[24px] font-normal ">New</Text>
        </View>

        <View className="flex flex-row space-x-2">
          <TouchableWithoutFeedback
            onPress={() => {
              navigate.navigate("Contacts");
            }}
          >
            <View className="rounded-full mr-2 flex items-center justify-center  bg-tekhelet w-[35px] aspect-square ">
              <MaterialCommunityIcons
                name="account-plus-outline"
                color={"#ffffff"}
                size={20}
              />
            </View>
          </TouchableWithoutFeedback>
          {selected.length !== 0 && (
            <ButtonMain
              onClick={() => {
                handleCreate();
              }}
              loading={conversationProcessLoading}
              disabled={
                selected.length == 0 ||
                (selected.length > 1 && name.length === 0)
              }
              text={"Create"}
            />
          )}
        </View>
      </View>
      {selected.length > 1 && (
        <View className="w-full px-3 h-[10%]">
          <InputField
            iconName={"account-group"}
            placeholder={"Enter a conversation name"}
            text={name}
            setText={setName}
          />
        </View>
      )}

      <View className="w-full h-[80%] p-4">
        <ContactList
          select={select}
          selected={selected}
          contacts={userContacts}
        />
      </View>
    </View>
  );
};

export default CreateComp;
