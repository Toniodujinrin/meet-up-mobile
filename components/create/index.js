import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContactList from "../contacts/contactList";
import ButtonMain from "../utils/buttonMain";
import InputField from "../inputFields";

const contacts = [
  {
    _id: "toniodujinrin@gmail.com",
    username: "Toniloba",
    defaultProfileColor: "#8B7168",
  },
  {
    profilePic: {
      public_id: "profilePictures/vsudjql9iehmgbyicb4r",
      url: "https://res.cloudinary.com/dltukdzmi/image/upload/v1702526932/profilePictures/vsudjql9iehmgbyicb4r.jpg",
    },
    _id: "tonilobaodujinrin@gmail.com",
    username: "Toni Odujinrin",
    defaultProfileColor: "#75B486",
  },
  {
    _id: "ronaldosunmu@gmail.com",
    username: "Ronny",
    defaultProfileColor: "#59AB83",
  },
];

const CreateComp = () => {
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
  return (
    <View className="h-scree w-screen flex-1">
      <View className="w-full flex-row items-center justify-between py-3  px-3">
        <View className="flex flex-row">
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("go back");
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
              console.log("navigate to add users page");
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
                console.log("create convo");
              }}
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
        <ContactList select={select} selected={selected} contacts={contacts} />
      </View>
    </View>
  );
};

export default CreateComp;
