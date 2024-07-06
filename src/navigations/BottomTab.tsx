import { View, Text, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import CreatePostScreen from "../Screens/CreatePostScreen";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../utils/color";
import SettingScreen from "../Screens/SettingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
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
          name="Accueil"
          component={HomeScreen}
          options={{
            tabBarLabelStyle: styles.label,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? colors.app.primary : "gray",
                }}
              >
                Accueil
              </Text>
            ),

            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={focused ? 28 : 22}
                color={focused ? "#FFF61A" : "gray"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Creer"
          component={CreatePostScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? colors.app.primary : "gray",
                }}
              >
                Creer
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="plus"
                size={focused ? 28 : 22}
                color={focused ? "#FFF61A" : "gray"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={SettingScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? colors.app.primary : "gray",
                }}
              >
                Profil
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="setting"
                size={focused ? 28 : 22}
                color={focused ? "#FFF61A" : "gray"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.tertiary, // Assurez-vous d'utiliser une couleur de fond appropriée
  },
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
    color: "gray",
  },
});
