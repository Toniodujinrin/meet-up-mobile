import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SearchBar from "../utils/searchBar";
import ProfileHeader from "./profileHeader";
import OnlineUsers from "./onlineUsers";
import Conversations from "./conversations";

const userConversations = [
  {
    type: "single",
    users: [
      {
        _id: "toniodujinrin@gmail.com",
        lastSeen: 1703102394517,
        username: "Toniloba",
        defaultProfileColor: "#8B7168",
      },
      {
        profilePic: null,
        _id: "todujinrin@gmail.com",
        lastSeen: 1703127298455,
        username: "Tons ",
        defaultProfileColor: "#6F8ABE",
      },
    ],
    name: "Toniloba",
    created: 1691735679741,
    conversationPic: {},
    lastSeen: 1703102394517,
    _id: "64d5df89cbac10d850e82700",
    defaultConversationColor: "#8B7168",
  },

  {
    type: "single",
    users: [
      {
        profilePic: {
          public_id: "profilePictures/vsudjql9iehmgbyicb4r",
          url: "https://res.cloudinary.com/dltukdzmi/image/upload/v1702526932/profilePictures/vsudjql9iehmgbyicb4r.jpg",
        },
        _id: "tonilobaodujinrin@gmail.com",
        lastSeen: 1703220579879,
        username: "Toni Odujinrin",
        defaultProfileColor: "#75B486",
      },
      {
        profilePic: null,
        _id: "todujinrin@gmail.com",
        lastSeen: 1703127298455,
        username: "Tons ",
        defaultProfileColor: "#6F8ABE",
      },
    ],
    name: "Toni Odujinrin",
    created: 1693768867786,
    conversationPic: {
      public_id: "profilePictures/vsudjql9iehmgbyicb4r",
      url: "https://res.cloudinary.com/dltukdzmi/image/upload/v1702526932/profilePictures/vsudjql9iehmgbyicb4r.jpg",
    },
    lastSeen: 1703220579879,
    _id: "64f4ddbc831f496fd89dce9d",
    defaultConversationColor: "#75B486",
  },
  {
    type: "group",
    users: [
      {
        _id: "toniodujinrin@gmail.com",
        lastSeen: 1703102394517,
        username: "Toniloba",
        defaultProfileColor: "#8B7168",
      },
      {
        profilePic: {
          public_id: "profilePictures/vsudjql9iehmgbyicb4r",
          url: "https://res.cloudinary.com/dltukdzmi/image/upload/v1702526932/profilePictures/vsudjql9iehmgbyicb4r.jpg",
        },
        _id: "tonilobaodujinrin@gmail.com",
        lastSeen: 1703220579879,
        username: "Toni Odujinrin",
        defaultProfileColor: "#75B486",
      },
      {
        profilePic: null,
        _id: "todujinrin@gmail.com",
        lastSeen: 1703127298455,
        username: "Tons ",
        defaultProfileColor: "#6F8ABE",
      },
    ],
    name: "group chat",
    created: 1694149073469,
    conversationPic: {},
    _id: "64fce4c66b180f6be4c10811",
    defaultConversationColor: "#C29476",
  },
  {
    type: "single",
    users: [
      {
        _id: "ronaldosunmu@gmail.com",
        lastSeen: 1695746617354,
        username: "Ronny",
        defaultProfileColor: "#59AB83",
      },
      {
        profilePic: null,
        _id: "todujinrin@gmail.com",
        lastSeen: 1703127298455,
        username: "Tons ",
        defaultProfileColor: "#6F8ABE",
      },
    ],
    name: "Ronny",
    created: 1695494280706,
    conversationPic: {},
    lastSeen: 1695746617354,
    _id: "651305f46cacffbc7c6e8709",
    defaultConversationColor: "#59AB83",
  },
  {
    type: "group",
    users: [
      {
        _id: "ronaldosunmu@gmail.com",
        lastSeen: 1695746617354,
        username: "Ronny",
        defaultProfileColor: "#59AB83",
      },
      {
        _id: "toniodujinrin@gmail.com",
        lastSeen: 1703102394517,
        username: "Toniloba",
        defaultProfileColor: "#8B7168",
      },
      {
        profilePic: {
          public_id: "profilePictures/vsudjql9iehmgbyicb4r",
          url: "https://res.cloudinary.com/dltukdzmi/image/upload/v1702526932/profilePictures/vsudjql9iehmgbyicb4r.jpg",
        },
        _id: "tonilobaodujinrin@gmail.com",
        lastSeen: 1703220579879,
        username: "Toni Odujinrin",
        defaultProfileColor: "#75B486",
      },
      {
        profilePic: null,
        _id: "todujinrin@gmail.com",
        lastSeen: 1703127298455,
        username: "Tons ",
        defaultProfileColor: "#6F8ABE",
      },
    ],
    name: "New convo ",
    created: 1703103052603,
    conversationPic: {},
    _id: "65834a4ceeb09c4da5112998",
    defaultConversationColor: "#9B8661",
  },
];

const Overview = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
  }, [searchValue]);

  return (
    <View className="flex-1 w-screen bg-darkGray">
      <View className="flex w-screen items-center h-[40%]">
        <ProfileHeader />
        <View className="p-3 w-full">
          <SearchBar
            placeholder={"Search users or conversations "}
            value={searchValue}
            setValue={setSearchValue}
          />
        </View>

        <OnlineUsers />
      </View>
      <View className="h-[60%] flex w-screen items-center">
        <Conversations searchResults={searchResults} />
      </View>
    </View>
  );
};

export default Overview;
