import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/color";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Nous sommes dans le Home les gars</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.quaternary,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
  },
});
