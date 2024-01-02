import React, { useContext } from "react";
import ContactsComp from "../../components/contacts";
import { UserContext } from "../../contexts/UserContext";
import LoadingPage from "../../components/utils/loadingPage";
import { View } from "react-native";
import { useQueries } from "react-query";

const Contacts = () => {
  const { getSelf, getContacts, getPendingSent, getPendingReceived } =
    useContext(UserContext);
  const [q1, q2, q3, q4] = useQueries([
    { queryKey: ["user"], queryFn: getSelf },
    { queryKey: ["contacts"], queryFn: getContacts },
    { queryKey: ["pendingSent"], queryFn: getPendingSent },
    { queryKey: ["pendingReceived"], queryFn: getPendingReceived },
  ]);
  return (
    <View>
      {q1.isLoading || q2.isLoading || q3.isLoading || q4.isLoading ? (
        <LoadingPage />
      ) : q1.isError || q2.isError || q3.isError || q4.isError ? (
        <View className="w-screen h-screen bg-darkGray"></View>
      ) : (
        <ContactsComp />
      )}
    </View>
  );
};

export default Contacts;
