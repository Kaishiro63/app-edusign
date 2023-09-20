import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const StatsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Statistique</Text>
            <View>
                <LinearGradient
                    colors={['#568AF5', '#D8E8FE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text>Total Sessions</Text>
                </LinearGradient>

                <LinearGradient
                    colors={['#71BE72', '#DBF1DD']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text>Présences</Text>
                </LinearGradient>

                <LinearGradient
                    colors={['#F5C445', '#F0C5B4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text>Absences justifiée</Text>
                </LinearGradient>

                <LinearGradient
                    colors={['#DF7651', '#EFC4B4']}
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