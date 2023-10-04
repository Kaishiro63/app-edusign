import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MainTabBar from "../components/MainTabBar";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ScannerScreen from "../screens/ScannerScreen";
import CustomHeader from "../components/CustomHeader";
import JustifieScreen from "../screens/JustifieScreen";
import SignScreen from "../screens/SignScreen";
import SingleCoursScreen from "../screens/SingleCoursScreen";
import { useSelector } from "react-redux";
import ChangePassword from "../screens/sub-screens/ChangePassword";
import QrCodeScreen from "../screens/QrCodeScreen"

const Stack = createNativeStackNavigator();

export const Route = () => {

    const isUser = useSelector((state) => state.user.value.id);

    if(!isUser){
        return (
            <NavigationContainer>
            <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTab" component={MainTabBar} />

            </Stack.Navigator>
        </NavigationContainer>
        );
    }

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }}>
      <Stack.Screen name="MainTab" component={MainTabBar} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScannerScreen} />
      <Stack.Screen name="Sign" component={SignScreen} />
      <Stack.Screen name="Justifie" component={JustifieScreen} />
      <Stack.Screen name="SingleCours" component={SingleCoursScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  );
}