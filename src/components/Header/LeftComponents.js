import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Text } from "react-native";
function LeftComponents({ ...props }) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Feather
        name="search"
        size={24}
        color="white"
        style={{ alignSelf: "center" }}
      />
      <Text style={styles.text}> Search</Text>
    </TouchableOpacity>
  );
}

export default LeftComponents;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 20,
  },
  text: {
    alignSelf: "center",
    fontSize: 18,
    color: "white",
    marginLeft: 20,
  },
});
