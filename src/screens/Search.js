import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import BackButton from "../components/UI/BackButton";
import { database } from "../firebase/firebaseConfig";

function Search(props) {
  const navigation = useNavigation();
  const [availableUser, setAvailableUser] = useState([]);
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
        setAvailableUser(
          snapShot.docs.map((doc) => ({
            uid: doc.data().uid,
            username: doc.data().username,
            profile_picture: doc.data().profile_picture,
          }))
        );
      });
      return unsubscribe;
    }
  }, [name]);
  return <View>{}</View>;
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

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 300,
  },
});
