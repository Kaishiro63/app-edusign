import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "../colors";

const StatsScreen = ({ totalSessions = 10, presences = 8, absencesJustifiees = 1, absences = 1 }) => {
    const tauxDePresence = (presences / totalSessions) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Statistiques</Text>
            </View>
            <View style={styles.cardContainer}>
                <LinearGradient
                    colors={[Colors.primaryBlue, Colors.lightBlue]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text style={styles.textCard}>Total Sessions</Text>
                    <Text style={styles.chiffreCard}>{totalSessions}</Text>
                </LinearGradient>

                <LinearGradient
                    colors={[Colors.primaryGreen, Colors.lightGreen]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text style={styles.textCard}>Présences</Text>
                    <Text style={styles.chiffreCard}>{presences}</Text>
                </LinearGradient>
            </View>
            <View style={styles.cardContainer}>
                <LinearGradient
                    colors={[Colors.primaryOrange, Colors.lightOrange]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text style={styles.textCard}>Absences justifiées</Text>
                    <Text style={styles.chiffreCard}>{absencesJustifiees}</Text>
                </LinearGradient>

                <LinearGradient
                    colors={[Colors.primaryRed, Colors.lightRed]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <Text style={styles.textCard}>Absences</Text>
                    <Text style={styles.chiffreCard}>{absences}</Text>
                </LinearGradient>
            </View>
            <LinearGradient
                colors={[Colors.lightGray, Colors.primaryGray]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.card, styles.fullWidthCard]}
            >
                <Text style={styles.textCard}>Taux de présence</Text>
                <Text style={styles.chiffreCard}>{tauxDePresence.toFixed(2)}%</Text>
            </LinearGradient>

            <View style={styles.flex}>
                <Text style={styles.textInfo}>Pendant les 3 derniers mois...</Text>
                <TouchableOpacity
                style={styles.btn}
                onPress={() => handleJustifie()}
                >
                <Text style={styles.btnText}>Justifier une absence</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.secondaryTitle}>Sessions manquées</Text>
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
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 50
    },
    secondaryTitle: {
        fontSize: 22,
        fontWeight: "bold"
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        borderRadius: 10,
        padding: 15,
        height: 100,
        width: '48%',
    },
    textCard: {
        fontWeight: "bold"
    },
    chiffreCard: {
        paddingTop: 10,
        fontSize: 32,
        fontWeight: "bold"
    },
    fullWidthCard: {
        width: '100%',
    },
    textInfo: {
        fontSize: 14,
        color: "#AAAAAA",
        marginTop: 15
    },
    btn: {
        width: "100%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        marginBottom: 20,
        backgroundColor: "#F7BA09",
    },
    btnText: {
        fontWeight: "bold",
        fontSize: 16
    },
});

export default StatsScreen;
