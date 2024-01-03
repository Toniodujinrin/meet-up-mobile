import { createContext, useState } from "react";
import { get, post, _delete } from "../api";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import "core-js/stable/atob";
import { useQueryClient } from "react-query";

export const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigation();
  const [conversationDetails, setconversationDetails] = useState(null);
  const [conversationProcessLoading, setConversationProcessLoading] =
    useState(false);

  const getConversation = async (id) => {
    try {
      const { data, noToken } = await get(`conversations/${id}`);
      if (noToken) return navigate.navigate("Login");
      if (data) setconversationDetails(data);
      else setconversationDetails(null);
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not get conversation details",
      });
    }
  };

  const createConversation = async (payload) => {
    try {
      setConversationProcessLoading(true);
      const { data, noToken } = await post("conversations", payload);
      if (noToken) return navigate.navigate("Login");
      if (data && data.status == "success") {
        navigate.navigate("Main");
        await queryClient.invalidateQueries({ queryKey: ["conversations"] });
        Toast.show({
          type: "success",
          text1: "conversation created successfully",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not create conversation details",
      });
    } finally {
      setConversationProcessLoading(false);
    }
  };

  const addToConversation = async (payload) => {
    try {
      setConversationProcessLoading(true);
      const { data, noToken } = await post("conversations/add", payload);
      if (noToken) return navigate.navigate("Login");
      if (data && data.status == "success") {
        queryClient.invalidateQueries(["conversations"]);
        Toast.show({
          type: "success",
          text1: "successfully added contact to conversation",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not add to conversation",
      });
    } finally {
      setConversationProcessLoading(false);
    }
  };

  const leaveConversation = async () => {
    try {
      setConversationProcessLoading(true);
      const { data, noToken } = await post(
        `conversations/leave/${conversationDetails._id}`
      );
      if (noToken) return navigate.navigate("Login");
      if (data && data.status == "success") {
        navigate.goBack();
        queryClient.invalidateQueries(["conversations"]);
        Toast.show({
          type: "success",
          text1: "successfully left conversation",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not leave conversation",
      });
    } finally {
      setConversationProcessLoading(false);
    }
  };

  const deleteConversation = async () => {
    try {
      setConversationProcessLoading(true);
      const { data, noToken } = await _delete(
        `conversations/${conversationDetails._id}`
      );
      if (noToken) return navigate.navigate("Login");
      if (data && data.status == "success") {
        navigate.goBack();
        queryClient.invalidateQueries(["conversations"]);
        Toast.show({
          type: "success",
          text1: "successfully deleted conversation",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return Toast.show({
          type: "error",
          text1: error.response.data,
        });
      }
      Toast.show({
        type: "error",
        text1: "could not delete conversation",
      });
    } finally {
      setConversationProcessLoading(false);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        setconversationDetails,
        deleteConversation,
        conversationProcessLoading,
        addToConversation,
        leaveConversation,
        createConversation,
        getConversation,
        conversationDetails,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
