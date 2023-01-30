import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Feather from "react-native-vector-icons/Feather";
import Search from "../UI/Search";

function LeftComponents({ ...props }) {
  return (
    <TouchableOpacity
      style={[{ flexDirection: "row" }, styles.container]}
      {...props}
    >
      <Feather
        name="search"
        size={24}
        color="white"
        style={{ alignSelf: "center" }}
      />
      <Search />
    </TouchableOpacity>
  );
}

export default LeftComponents;
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
});
