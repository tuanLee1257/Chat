import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchBox from "./SearchBox";

function BackButton({ ...props }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ marginHorizontal: 15 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back" size={28} color="white" />
    </TouchableOpacity>
  );
}
export default BackButton;
