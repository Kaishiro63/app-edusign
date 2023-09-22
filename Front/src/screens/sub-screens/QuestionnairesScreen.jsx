import { View, Text, StyleSheet } from "react-native";

const QuestionnaireScreen = () => {
    return (
        <View style={screenStyles.container}>
        <Text style={screenStyles.sectionTitle}>Questionnaires</Text>
        </View>
    );
}

export default QuestionnaireScreen;

const screenStyles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5
      }
});