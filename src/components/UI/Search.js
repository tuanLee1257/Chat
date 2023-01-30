import React from "react";
import { View, StyleSheet, Text } from "react-native";

function Search(props) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 18 }}>Search</Text>
    </View>
  );
}

export default Search;
const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    alignSelf: "flex-end",
    //   flex: 1,
    //   borderBottomWidth: 1,
    //   borderColor: "white",
  },
});
