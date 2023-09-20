import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmargementScreen from "../screens/sub-screens/EmargementScreen";
import QuestionnaireScreen from "../screens/sub-screens/QuestionnairesScreen";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Tab = createMaterialTopTabNavigator();



const Onglets = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { backgroundColor: 'powderblue' },

            }}
        >
            <Tab.Screen name="Emargement" component={EmargementScreen} />
            <Tab.Screen name="Questionnaire" component={QuestionnaireScreen} />
        </Tab.Navigator>
    );
};

export default Onglets;