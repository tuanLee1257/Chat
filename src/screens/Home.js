import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { AuthenticatedUserContext } from "../config/context";
import { database } from "../firebase/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { TouchableOpacity } from "react-native";
import LeftComponents from "../components/Header/LeftComponents";
import { useNavigation } from "@react-navigation/native";

function Home({}) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      title: false,
      headerLeft: () => (
        <LeftComponents onPress={() => navigation.navigate("Search")} />
      ),
    });
  }, [navigation]);

  const getContacs = () => {
    const collectionRef = collection(database, "contacts");
    const q = query(
      collectionRef,
      where("members", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapShot) => {
      setContacts(
        snapShot.docs.map((doc) => ({
          contactId: doc.id,
          // createAt: doc.data().createAt,
          // owner:doc.data().owner,
          // type:doc.data().type,
          name: doc.data().name,
          image: doc.data().image,
          members: doc.data().members,
        }))
      );
    });
    return unsubscribe;
  };

  useLayoutEffect(() => {
    getContacs();
  }, []);

  return (
    <>
      {contacts.map((contact, index) => (
        <Contact contact={contact} key={index} navigation={navigation} />
      ))}
    </>
  );
}

export default Home;

function Contact({ contact, navigation }) {
  return (
    <TouchableOpacity
      style={styles.contactContainer}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("Chat", { contact: contact })}
    >
      {/* Image */}
      <Image source={{ uri: contact.image }} style={styles.image} />
      <View style={styles.textView}>
        {/* Username */}
        <Text style={styles.username}>{contact.name}</Text>
        {/* Lastest message */}
        {/* Status */}
        <Text style={styles.messages}>hello</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
  },
  textView: {
    marginLeft: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "green",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  messages: {
    fontSize: 13,
    fontWeight: "300",
    color: "gray",
  },
});
