import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import StatsScreen from "../screens/StatsScreen";
import ProfilScreen from "../screens/ProfilScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SignScreen from "../screens/SignScreen";
import ScannerScreen from "../screens/ScannerScreen";

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: {
                paddingTop: 5,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName = "";

              if (route.name === "Accueil") {
                iconName = "home";
                return <FontAwesome name={iconName} size={size} color={color} />;

              } else if (route.name === "Statistiques") {
                iconName = "stats-chart";
                return <Ionicons name={iconName} size={size} color={color} />;

              } else if (route.name === "Documents") {
                iconName = "folder-open-outline";
                return <Ionicons name={iconName} size={size} color={color} />;

              } else if (route.name === "Calendrier") {
                iconName = "calendar-outline";
                return <Ionicons name={iconName} size={size} color={color} />;

              } else if (route.name === "Profil") {
                iconName = "user-circle-o";
                return <FontAwesome name={iconName} size={size} color={color} />;

              } else if (route.name === "Signature") {
                iconName = "user-circle-o";
                return <FontAwesome name={iconName} size={size} color={color} />;

              }

            },
            tabBarActiveTintColor: "#e3c022",
            tabBarInactiveTintColor: "#8a8a8a",
            headerShown: true,
          })}>
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Statistiques" component={StatsScreen} />
            <Tab.Screen name="Documents" component={DocumentsScreen} />
            <Tab.Screen name="Calendrier" component={CalendarScreen} />
            <Tab.Screen name="Profil" component={ProfilScreen} />
            <Tab.Screen name="Signature" component={SignScreen} />

        </Tab.Navigator>
    );
}

export default MainTabBar;