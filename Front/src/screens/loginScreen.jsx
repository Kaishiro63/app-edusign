import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Swiper from "react-native-web-swiper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function loginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (

        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.flex}>
                <Image style={styles.logo} source={require('../../assets/logo-app.png')}/>
            </View>
            <View style={styles.header}>
                <Swiper
                    from={1}
                    minDistanceForAction={0.1}
                    controlsProps={{
                        prevTitle: '',
                        nextTitle: '',
                        dotsTouchable: true,
                        dotsPos: 'bottom',
                        prevPos: false,
                        nextPos: false,
                        dotsProps: {
                            dotColor: "#F7BA09",
                        }
                    }}
                >
                    <View style={styles.slide}>
                        <Text style={styles.slideTitle}>Scan It</Text>
                        <Text style={styles.slideDescription}>Pas besoin de feuille de présence, utilisez votre téléphone et c'est partie</Text>
                        <Image source={require('../../assets/IMG_7618.jpg')} style={styles.slideImage} />
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideTitle}>Check It</Text>
                        <Text style={styles.slideDescription}>Votre signature est confirmée quand vous scannez le QR Code</Text>
                        <Image source={require('../../assets/IMG_7619.jpg')} style={styles.slideImage} />
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.slideTitle}>Manage</Text>
                        <Text style={styles.slideDescription}>Vous pouvez voir vos absences et votre calendrier sur votre dashboard</Text>
                        <Image source={require('../../assets/IMG_7620.jpg')} style={styles.slideImage} />
                    </View>
                </Swiper>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color='#ccc' style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email ou pseudo apprenant"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color="#ccc" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <FontAwesome
                        name={showPassword ? 'eye-slash' : 'eye'}
                        size={20}
                        color="#ccc"
                        style={styles.icon}
                        onPress={togglePasswordVisibility}
                    />
                </View>
                <View style={styles.flex}>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => {
                            // Gérer la connexion ici
                        }}
                    >
                        <Text style={styles.loginBtnText}>Connexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flex: 1,
        marginBottom: 20,
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        resizeMode: 'contain',
        height: 100,
        width: 130,
        marginTop: 20,
    },
    form: {
        flex: 1,
    },
    input: {
        flex: 1,
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 5,
        marginLeft: 5,
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#F7BA09",
    },
    loginBtnText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    slideImage: {
        width: 170,
        height: 170,
        resizeMode: 'cover',
        marginBottom: 20,
        marginTop: 10,
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    slideDescription: {
        fontSize: 14,
        textAlign: 'center',
        maxWidth: 260,
    },
});

export default loginScreen;
