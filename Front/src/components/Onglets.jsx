import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmargementScreen from "../screens/sub-screens/EmargementScreen";
import QuestionnaireScreen from "../screens/sub-screens/QuestionnairesScreen";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Colors } from "../colors";

const Tab = createMaterialTopTabNavigator();



const Onglets = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarIndicatorStyle: { backgroundColor: Colors.primaryYellow },
                tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 15 },
                tabBarLabelPosition: 'left',
            }}
        >
            <Tab.Screen name="Emargement" component={EmargementScreen} />
            <Tab.Screen name="Questionnaire" component={QuestionnaireScreen} />
        </Tab.Navigator>
    );
};

export default Onglets;