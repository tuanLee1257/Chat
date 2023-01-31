import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, Image } from "react-native";
import BackButton from "../components/UI/BackButton";
import { database, initFirebase } from "../firebase/firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { AuthenticatedUserContext } from "../config/context";

function Search(props) {
  const navigation = useNavigation();
  const [availableContact, setavailableContact] = useState([]);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [name, setName] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      title: false,
      headerLeftStyles: {
        color: "white",
      },
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <BackButton onPress={() => navigation.goBack()} />
          <SearchBox
            styles={{ flex: 1 }}
            onChangeText={(text) => setName(text)}
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (name != "" && name != null) {
      const collectionRef = collection(database, "users");
      const q = query(
        collectionRef,
        where("username", ">=", name),
        where("username", "<=", name + "~")
      );

      const unsubscribe = onSnapshot(q, (snapShot) => {
        setavailableContact(
          snapShot.docs.map((doc) => ({
            uid: doc.data().uid,
            username: doc.data().username,
            profile_picture: doc.data().profile_picture,
          }))
        );
      });
      console.log(availableContact);
      return unsubscribe;
    }
  }, [name]);

  const addContact = (contact, user) => {
    const collectionRef = collection(database, "contacts");

    setDoc(collectionRef, {
      image: contact.profile_picture,
      name: contact.username,
      member: [contact.uid, user.uid],
      createAt: initFirebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  if (availableContact != null) {
    return (
      <View>
        {availableContact.map((contact, index) => (
          <RenderUser contact={contact} key={index} />
        ))}
      </View>
    );
  }
  return (
    <View>
      <Text> Loading</Text>
    </View>
  );
}

export default Search;

function SearchBox({ ...props }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        placeholderTextColor="gray"
        {...props}
      />
    </View>
  );
}

function RenderUser({ contact, ...props }) {
  return (
    <View style={styles.usercontainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: contact.profile_picture }} style={styles.image} />
        <Text style={styles.name}>{contact.username}</Text>
      </View>
      <TouchableOpacity style={{}}>
        <Ionicons name="add" size={36} />
      </TouchableOpacity>
    </View>
    // <View>
    //   <Text>heelo</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "white",
    borderRadius: 7,
    width: 300,
    paddingLeft: 10,
  },
  usercontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  name: {
    marginLeft: "5%",
    fontSize: 23,
    fontWeight: "500",
  },
});
