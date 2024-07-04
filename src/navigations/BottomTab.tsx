import { View, Text, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import CreatePostScreen from "../Screens/CreatePostScreen";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../utils/color";
import SettingScreen from "../Screens/SettingScreen";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === "ios" && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          },
        ],
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: "#FFF61A",
        tabBarActiveTintColor: "#FFF61A",
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={focused ? 28 : 22}
              color={focused ? "#FFF61A" : "#FFF61A"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="create"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plus"
              size={focused ? 28 : 22}
              color={focused ? "#FFF61A" : "#FFF61A"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="setting"
              size={focused ? 28 : 22}
              color={focused ? "#FFF61A" : "#FFF61A"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTab;

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: "90%",
    borderRadius: 12,
    left: "5%",
    bottom: 20,
    backgroundColor: colors.app.tertiary,
    height: 60,
  },
  label: {
    textTransform: "capitalize",

    fontSize: 12,
  },
});
