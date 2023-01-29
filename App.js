import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import Navigation from "./Navigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Login /> */}
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
