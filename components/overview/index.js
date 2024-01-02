import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View } from "react-native";
import SearchBar from "../utils/searchBar";
import ProfileHeader from "./profileHeader";
import OnlineUsers from "./onlineUsers";
import Conversations from "./conversations";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import Menu from "../utils/menu";
import { RefreshControl } from "react-native";
const Overview = () => {
  const navigate = useNavigation();
  const {
    userConversations,
    logout,
    reloadConversations,
    reloadConversationsLoading,
  } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");
  const [dropDownShowing, setDropDownShowing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const options = [
    {
      name: "Settings",
      iconName: "account-cog",
      onClick: () => {
        navigate.navigate("Settings");
        setDropDownShowing(false);
      },
    },
    {
      name: "Contacts",
      iconName: "contacts",
      onClick: () => {
        navigate.navigate("Contacts");
        setDropDownShowing(false);
      },
    },
    {
      name: "Logout",
      iconName: "exit-to-app",
      onClick: () => {
        logout();
        setDropDownShowing(false);
      },
      dangerIcon: true,
    },
  ];
  useEffect(() => {
    if (searchValue.length > 0) {
      const results = userConversations.filter((conversation) =>
        conversation.name
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(userConversations);
    }
  }, [searchValue, userConversations]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={reloadConversationsLoading}
          onRefresh={reloadConversations}
        />
      }
      className=" h-screen w-screen bg-darkGray"
    >
      <View className="flex w-screen items-center">
        <ProfileHeader
          dropDownShowing={dropDownShowing}
          setDropDownShowing={setDropDownShowing}
        />
        {dropDownShowing && (
          <View className=" absolute z-20 w-full flex flex-row justify-end pr-2  top-[60px]">
            <Menu options={options} />
          </View>
        )}
        <View className="p-3    w-full">
          <SearchBar
            placeholder={"Search users or conversations "}
            value={searchValue}
            setValue={setSearchValue}
          />
        </View>

        <OnlineUsers />
      </View>
      <View className="flex w-screen items-center">
        <Conversations searchResults={searchResults} />
      </View>
    </ScrollView>
  );
};

export default Overview;
