import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import StatsScreen from "../screens/StatsScreen";
import ProfilScreen from "../screens/ProfilScreen";

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Documents" component={DocumentsScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
            <Tab.Screen name="Profil" component={ProfilScreen} />

        </Tab.Navigator>
    );
}

export default MainTabBar;