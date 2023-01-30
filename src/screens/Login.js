import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Button from "../components/UI/Button";
import TextInput from "../components/UI/TextInput";
import { database, auth } from "../firebase/firebaseConfig";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPressed = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
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
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: "blue" }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
