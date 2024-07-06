import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/navigations/Stack";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
