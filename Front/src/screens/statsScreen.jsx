import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "../colors";

const StatsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Statistique</Text>
            <View>
                <LinearGradient
                    colors={[Colors.primaryBlue, Colors.lightBlue]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text>Total Sessions</Text>
                </LinearGradient>

                <LinearGradient
                    colors={[Colors.primaryGreen, Colors.lightGreen]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text>Présences</Text>
                </LinearGradient>

                <LinearGradient
                    colors={[ Colors.primaryOrange, Colors.lightOrange]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text>Absences justifiée</Text>
                </LinearGradient>

                <LinearGradient
                    colors={[Colors.primaryRed, Colors.lightRed]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text>Absences</Text>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        borderRadius: 20,
        padding: 5,
    }
});

export default StatsScreen;