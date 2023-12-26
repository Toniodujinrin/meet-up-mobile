import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import SearchBar from "../utils/searchBar";
import ContactList from "./contactList";

const ContactsComp = () => {
  const [currentPage, setCurrentPage] = useState("contacts");
  const [dropDownShowing, setDropDownShowing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState([]);

  const select = (_id) => {
    let _selected = [...selected];
    if (selected.includes(_id)) {
      _selected = _selected.filter((item) => item !== _id);
    } else {
      _selected.push(_id);
    }
    setSelected(_selected);
  };
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

  return (
    <View className="h-screen w-screen flex-1">
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
          {currentPage == "contacts" && (
            <Text className="text-white text-[24px] font-normal ">
              Contacts
            </Text>
          )}
          {currentPage == "pending" && (
            <Text className="text-white text-[21px] ">Pending</Text>
          )}
          {currentPage == "recieve" && (
            <Text className="text-white text-[21px] ">Requests</Text>
          )}

          <TouchableWithoutFeedback
            onPress={() => {
              setDropDownShowing(!dropDownShowing);
            }}
          >
            <View
              className={`${
                dropDownShowing && " -rotate-90"
              } transition-[10000ms]`}
            >
              <MaterialCommunityIcons
                color={"#ffffff"}
                size={30}
                name="chevron-down"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <TouchableWithoutFeedback className="">
          <View
            style={{ alignSelf: "flex-end" }}
            className="rounded-full flex items-center justify-center  bg-tekhelet w-[35px] aspect-square "
          >
            <MaterialCommunityIcons
              name="account-plus-outline"
              color={"#ffffff"}
              size={20}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View className="w-full px-3 h-[10%]">
        <SearchBar
          placeholder={"Search for a contact"}
          setValue={setSearchValue}
          value={searchValue}
        />
      </View>
      <View className="h-[80%]  w-full px-3">
        <ContactList
          contacts={contacts}
          shouldSelect={false}
          select={select}
          selected={selected}
        />
      </View>
    </View>
  );
};

export default ContactsComp;
