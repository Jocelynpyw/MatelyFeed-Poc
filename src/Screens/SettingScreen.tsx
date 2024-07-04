import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Nous sommes dans les settings les gars</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingScreen;
