import { View, Text, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bottom" component={BottomTab} />
      {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: "90%",
    borderRadius: 12,
    left: "5%",
    bottom: 20,
    height: 60,
  },
  label: {
    textTransform: "capitalize",

    fontSize: 12,
  },
});
