import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StatsScreen from "./src/screens/StatsScreen";
import ProfilScreen from "./src/screens/ProfilScreen";
import DocumentScreen from "./src/screens/DocumentsScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import HomeScreen from "./src/screens/HomeScreen";
import loginScreen from "./src/screens/loginScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Stats") {
            iconName = "newspaper-o";
          } else if (route.name === "Documents") {
            iconName = "info";
          } else if (route.name === "Calendar") {
            iconName = "infos";
          } else if (route.name === "Profil") {
            iconName = "infos";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0077b6",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Documents" component={DocumentScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Login" component={loginScreen} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
