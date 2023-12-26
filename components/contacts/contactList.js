import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import ContactBoxWithSelect from "./contactBoxWithSelect";
import ContactBoxWithoutSelect from "./contactBoxWithoutSelect";

const ContactList = ({ selected, select, shouldSelect = true, contacts }) => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const list = [];
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let letter of alphabets) {
      const listOfContacts = [];
      contacts.forEach((contact) => {
        if (contact._id[0].toUpperCase() == letter)
          listOfContacts.push(contact);
      });
      if (listOfContacts.length) {
        list.push({ letter, listOfContacts });
      }
    }
    setContactList(list);
  }, [contacts]);
  return (
    <ScrollView className="h-[100%] w-full">
      {contactList.map((alphabet) => (
        <View key={alphabet.letter} className="flex flex-col my-4 items-start">
          <Text className="text-white text-[21px] mb-2">{alphabet.letter}</Text>
          <View className="w-full flex flex-col space-y-4">
            {shouldSelect
              ? alphabet.listOfContacts.map((contact) => (
                  <View key={contact._id}>
                    <ContactBoxWithSelect
                      key={contact._id}
                      image={contact.profilePic}
                      defaultColor={contact.defaultProfileColor}
                      username={contact.username}
                      _id={contact._id}
                      selected={selected}
                      select={select}
                    />
                  </View>
                ))
              : alphabet.listOfContacts.map((contact) => (
                  <View key={contact._id}>
                    <ContactBoxWithoutSelect
                      defaultColor={contact.defaultProfileColor}
                      key={contact._id}
                      username={contact.username}
                      image={contact.profilePic}
                      _id={contact._id}
                    />
                  </View>
                ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContactList;
