import { createContext, useContext, useState } from "react";
import { post, get, put, _delete } from "../api";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";
import "core-js/stable/atob";
import { useNavigation } from "@react-navigation/native";
// import { SocketContext } from "./socketContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "react-query";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigation();
  // const { connect, disconnect } = useContext(SocketContext);
  const [user, setUser] = useState({});
  const [authenticationProcessLoading, setAuthenticationProcessLoading] =
    useState(false);
  const [userConversations, setUserConversations] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const [pendingSent, setPendingSent] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [pendingReceived, setPendingReceived] = useState([]);
  const [userSearchLoading, setUserSearchLoading] = useState(false);
  const [updateProcessLoading, setUpdateProcessLoading] = useState(false);
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [reloadConversationsLoading, setReloadConversationsLoading] =
    useState();
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const [removeProfilePicLoading, setRemoveProfilePicLoading] = useState(false);

  const authenticate = async (payload) => {
    try {
      setAuthenticationProcessLoading(true);
      const res = await post("auth", payload, false);
      let token = res.headers.authorization;
      if (!token)
        return Toast.show({
          type: "error",
          text1: "An error occured, try again",
        });
      token = token.replace("Bearer", "").trim();
      await AsyncStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      await AsyncStorage.setItem("user", JSON.stringify(decodedToken));
      if (!decodedToken.emailVerified) return navigate.navigate("VerifyEmail");
      if (!decodedToken.accountVerified)
        return navigate.navigate("VerifyAccount");
      else {
        // connect();
        navigate.navigate("Main");
        Toast.show({
          type: "success",
          text1: "Welcome",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data)
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      Toast.show({
        type: "error",
        text1: "could not log in, please try later",
      });
    } finally {
      setAuthenticationProcessLoading(false);
    }
  };

  const logout = async (navigation) => {
    // disconnect();
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    navigate.navigate("Login");
  };

  const getSelf = async () => {
    const { data, noToken } = await get("users/self");
    if (data) return setUser(data);
    if (noToken) return navigate.navigate("Login");
  };

  const getConversations = async () => {
    const { data, noToken } = await get("users/conversations");
    if (data) return setUserConversations(data);
    if (noToken) return navigate.navigate("Login");
  };

  const reloadConversations = async () => {
    try {
      setReloadConversationsLoading(true);
      const { data, noToken } = await get("users/conversations");
      if (data) return setUserConversations(data);

      if (noToken) return navigate.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "could not get conversations",
      });
    } finally {
      setReloadConversationsLoading(false);
    }
  };
  const getContacts = async () => {
    const { data, noToken } = await get("users/contacts");
    if (data) return setUserContacts(data);
    if (noToken) return navigate.navigate("Login");
  };

  const getPendingSent = async () => {
    const { data, noToken } = await get("users/pending/sent");
    if (data) return setPendingSent(data);
    if (noToken) return navigate.navigate("Login");
  };

  const getPendingReceived = async () => {
    const { data, noToken } = await get("users/pending/received");
    if (data) return setPendingReceived(data);
    if (noToken) return navigate.navigate("Login");
  };

  const searchUsers = async (searchString) => {
    try {
      setUserSearchLoading(true);
      const { data } = await get(
        `users/searchUser/${searchString.toLowerCase()}`
      );
      setSearchedUsers(data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "could not perform search",
      });
    } finally {
      setUserSearchLoading(false);
    }
  };

  const sendRequest = async (id) => {
    try {
      await post(`users/add/${id}`);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["pendingSent"] });
      queryClient.invalidateQueries({ queryKey: ["pendingReceived"] });
      Toast.show({
        type: "success",
        text1: "contact request sent",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "could not send request",
      });
    }
  };

  const acceptRequest = async (id) => {
    try {
      await post(`users/accept/${id}`);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["pendingSent"] });
      queryClient.invalidateQueries({ queryKey: ["pendingReceived"] });
      Toast.show({
        type: "success",
        text1: "contact request accepted",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "could not accept contact request",
      });
    }
  };

  const updateUser = async (payload) => {
    try {
      setUpdateProcessLoading(true);
      await put("users", payload);
      queryClient.invalidateQueries(["user"]);
      Toast.show({
        type: "success",
        text1: "profile updated",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "could not update contact request",
      });
    } finally {
      setUpdateProcessLoading(false);
    }
  };

  const uploadProfilePic = async (payload) => {
    try {
      setProfilePicLoading(true);
      await post("users/uploadImage", payload);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      Toast.show({
        type: "success",
        text1: "profile updated",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "could not remove profile picture",
      });
    } finally {
      setProfilePicLoading(false);
    }
  };

  const removeProfilePic = async (payload) => {
    try {
      setRemoveProfilePicLoading(true);
      await _delete("users/removeProfilePic");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      Toast.show({
        type: "success",
        text1: "profile updated",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "could not remove profile picture",
      });
    } finally {
      setRemoveProfilePicLoading(false);
    }
  };
  const deleteAccount = async () => {
    try {
      setDeleteAccountLoading(true);
      //disconnect();
      await _delete("users");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      navigate.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "could not remove profile picture",
      });
    } finally {
      setDeleteAccountLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        uploadProfilePic,
        deleteAccount,
        deleteAccountLoading,
        profilePicLoading,
        updateProcessLoading,
        updateUser,
        acceptRequest,
        sendRequest,
        searchUsers,
        searchedUsers,
        userSearchLoading,
        authenticate,
        getPendingReceived,
        getPendingSent,
        pendingReceived,
        pendingSent,
        authenticationProcessLoading,
        getSelf,
        user,
        getConversations,
        userConversations,
        userContacts,
        getContacts,
        logout,
        removeProfilePic,
        removeProfilePicLoading,
        reloadConversations,
        reloadConversationsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
