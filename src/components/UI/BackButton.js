import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
function BackButton({ ...props }) {
  return (
    <TouchableOpacity style={{ marginHorizontal: 15 }} {...props}>
      <Ionicons name="chevron-back" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default BackButton;
