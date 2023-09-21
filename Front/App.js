
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MainTabBar from "./src/components/MainTabBar";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import user from "./reducers/user";
import ScannerScreen from "./src/screens/ScannerScreen";
import CustomHeader from "./src/components/CustomHeader";
import JustifieScreen from "./src/screens/JustifieScreen";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }}>
          <Stack.Screen name="MainTab" component={MainTabBar} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan" component={ScannerScreen} />
          <Stack.Screen name="Justifie" component={JustifieScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
