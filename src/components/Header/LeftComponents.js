import React from "react";
import { View, StyleSheet } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Feather from "react-native-vector-icons/Feather";
import Search from "../UI/Search";

function LeftComponents(props) {
  return (
    <View style={[{ flexDirection: "row" }, styles.container]}>
      <Feather
        name="search"
        size={24}
        color="white"
        style={{ alignSelf: "center" }}
      />
      <Search />
    </View>
  );
}

export default LeftComponents;
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
});
