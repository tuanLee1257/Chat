import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../values/Colors";
import { Text, TextInput as Input } from "react-native-paper";

function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        {...props}
        selectionColor={Colors.primary}
        underlineColor="transparent"
        mode="outlined"
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

export default TextInput;
const styles = StyleSheet.create({
  container: {
    width: "100%",

    marginVertical: 12,
  },
  input: {
    backgroundColor: Colors.surface,
  },
  description: {
    fontSize: 13,
    color: Colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: Colors.error,
    paddingTop: 8,
  },
});
