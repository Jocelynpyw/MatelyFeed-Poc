import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/navigations/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
