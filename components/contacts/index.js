import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import SearchBar from "../utils/searchBar";
import ContactList from "./contactList";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import Menu from "../utils/menu";
import Loaders from "react-native-pure-loaders";

const ContactsComp = () => {
  const [currentPage, setCurrentPage] = useState("contacts");
  const [dropDownShowing, setDropDownShowing] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {
    userContacts,
    pendingSent,
    pendingReceived,
    searchUsers,
    searchedUsers,
    userSearchLoading,
  } = useContext(UserContext);
  const navigate = useNavigation();
  const options = [
    {
      name: "Contacts",
      iconName: "account",
      onClick: () => {
        setCurrentPage("contacts");
        setDropDownShowing(false);
      },
    },
    {
      name: "Pending",
      iconName: "clock",
      onClick: () => {
        setCurrentPage("pending");
        setDropDownShowing(false);
      },
    },

    {
      name: "Requests",
      iconName: "checkbox-multiple-marked-circle",
      onClick: () => {
        setCurrentPage("requests");
        setDropDownShowing(false);
      },
    },
  ];
  useEffect(() => {
    let searchPool = [];
    if (currentPage == "add") {
      if (searchValue) {
        searchUsers(searchValue);
      }
    } else {
      if (currentPage == "contacts") searchPool = [...userContacts];
      else if (currentPage == "pending") searchPool = [...pendingSent];
      else if (currentPage == "requests") searchPool = [...pendingReceived];
      if (searchValue.length > 0) {
        const results = searchPool.filter((contact) =>
          contact._id.toLowerCase().includes(searchValue.toLocaleLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults(searchPool);
      }
    }
  }, [searchValue, currentPage, pendingSent, pendingReceived, userContacts]);

  return (
    <View className="h-screen w-screen  bg-darkGray">
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
          {currentPage == "contacts" && (
            <Text className="text-white text-[24px] font-normal ">
              Contacts
            </Text>
          )}
          {currentPage == "pending" && (
            <Text className="text-white font-normal text-[21px] ">Pending</Text>
          )}
          {currentPage == "requests" && (
            <Text className="text-white text-[21px] font-normal ">
              Requests
            </Text>
          )}
          {currentPage == "add" && (
            <Text className="text-white text-[21px] font-normal ">Add</Text>
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
          {dropDownShowing && (
            <View className="absolute z-30  top-[40px]">
              <Menu options={options} />
            </View>
          )}
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            setCurrentPage("add");
          }}
        >
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
        {currentPage == "add" ? (
          userSearchLoading ? (
            <View className="w-full  flex justify-center items-center">
              <Loaders.Ellipses size={35} color="#ffffff" />
            </View>
          ) : (
            <ContactList contacts={searchedUsers} shouldSelect={false} />
          )
        ) : (
          <ContactList contacts={searchResults} shouldSelect={false} />
        )}
      </View>
    </View>
  );
};

export default ContactsComp;
