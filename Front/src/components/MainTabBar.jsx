import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import HomeScreen from "../screens/HomeScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import StatsScreen from "../screens/StatsScreen";
import ProfilScreen from "../screens/ProfilScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SignScreen from "../screens/SignScreen";
import AdminScreen from "../screens/AdminScreen";
import QrCodeScreen from "../screens/QrCodeScreen";
import AdminFormScreen from "../screens/AdminFormScreen";
import { useSelector } from "react-redux";
import ChangePassword from "../screens/sub-screens/ChangePassword";

const Tab = createBottomTabNavigator();
const MainTabBar = () => {
  const currentUser = useSelector((state) => state.user.value);
  console.log("je suis ici",currentUser)

  if(!currentUser.admin){
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

            }

          },
          tabBarActiveTintColor: "#e3c022",
          tabBarInactiveTintColor: "#8a8a8a",
          headerShown: false,
        })}>
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Statistiques" component={StatsScreen} />
          <Tab.Screen name="Documents" component={DocumentsScreen} />
          <Tab.Screen name="Calendrier" component={CalendarScreen} />
          <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
  );

  }else if(currentUser.admin === true){
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarStyle: {
              paddingTop: 5,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Mes cours") {
              iconName = "book";
              return <FontAwesome name={iconName} size={size} color={color} />;

            } else if (route.name === "Ajouter un cours") {
              iconName = "add-to-list";
              return <Entypo name={iconName} size={size} color={color} />;

            }else if (route.name === "Profil") {
              iconName = "user-circle-o";
              return <FontAwesome name={iconName} size={size} color={color} />;

            }
          },
          tabBarActiveTintColor: "#e3c022",
          tabBarInactiveTintColor: "#8a8a8a",
          headerShown: false,
        })}>

            <Tab.Screen name="Mes cours" component={AdminScreen} />
            <Tab.Screen name="Ajouter un cours" component={AdminFormScreen} />
            <Tab.Screen name="Profil" component={ProfilScreen} />

        </Tab.Navigator>
      );
    }

  }

export default MainTabBar;