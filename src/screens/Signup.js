import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Button from "../components/UI/Button";
import TextInput from "../components/UI/TextInput";
import { auth, database } from "../firebase/firebaseConfig";

const getRandomProfilePic = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  const picture = data.results[0].picture.large;
  return picture;
};

function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onSignUpPressed = async () => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      database
        .collection("users")
        .doc(authUser.user.uid)
        .set({
          uid: authUser.user.uid,
          username: username,
          profile_picture: await getRandomProfilePic(),
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        returnKeyType="nex"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
        autoCapitalize="none"
      />
      <TextInput
        label="Email"
        returnKeyType="nex"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button mode="contained" onPress={onSignUpPressed}>
        Sign up
      </Button>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "blue" }}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
