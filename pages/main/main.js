import React, { useContext } from "react";
import Overview from "../../components/overview";
import { UserContext } from "../../contexts/UserContext";
import { useQueries } from "react-query";
import { View } from "react-native";
import LoadingPage from "../../components/utils/loadingPage";

const Main = () => {
  const { getSelf, getConversations, getContacts, getPendingReceived } =
    useContext(UserContext);
  const [q1, q2, q3, q4] = useQueries([
    { queryKey: ["user"], queryFn: getSelf },
    { queryKey: ["conversations"], queryFn: getConversations, staleTime: 1000 },
    { queryKey: ["contacts"], queryFn: getContacts },
    { queryKey: ["pendingReceived"], queryFn: getPendingReceived },
  ]);
  return (
    <View>
      {q1.isLoading || q2.isLoading || q3.isLoading || q4.isLoading ? (
        <LoadingPage />
      ) : q1.isError || q2.isError || q1.isError || q2.isError ? (
        <View className="w-screen h-screen bg-darkGray"></View>
      ) : (
        <Overview />
      )}
    </View>
  );
};

export default Main;
