import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Onglets from '../components/Onglets';
const HomeScreen = () => {
    const [cards, setCards] = useState([1, 2, 3]); // Initial array of cards
    const [user, setUser] = useState([]);

    const removeCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1); // Remove the card at the specified index
        setCards(updatedCards); // Update the state to reflect the removed card
    };

    useEffect(() => {
        const handleGetUser = async () => {
          console.log("test");
          try {
            const response = await fetch(
              "https://app-edusign-back1.vercel.app/users/profile?uid=650ab8c16ea8d8449ae3be12"
            );
            const data = await response.json();
            if (!data.result) {
              console.log("erreur de fetch");
              return;
            } else {
              setUser(data.allDataUser);
            }
          } catch (error) {
            console.log(error);
          }
        };
        handleGetUser();
      }, []);

    return (
        <View style={screenStyles.container}>
            <Text style={screenStyles.title}>Bonjour {user.prenom}</Text>

            <View>
                <ScrollView
                    horizontal={true}
                    directionalLockEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={screenStyles.scrollViewContent}
                    style={screenStyles.scrollViewContainer}
                >
                    {cards.map((card, index) => (
                        <LinearGradient colors={['#F6C444', '#FCECB8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={screenStyles.card}>
                            <TouchableOpacity key={index} >
                                <Text style={screenStyles.text}>Asynchrone ou synchrone, lequel choisir pour un apprentissage réussi ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={screenStyles.closeButton}
                                    onPress={() => removeCard(index)} // Call removeCard function on press
                                >
                                <Text style={screenStyles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    ))}
                </ScrollView>
                <View style={{display: 'flex', justifyContent: 'flex-start'}}>
                    <LinearGradient colors={['#FAE18F', '#FAE18F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={screenStyles.buttonContainer}>
                        <TouchableOpacity>
                            <Text style={screenStyles.buttonText}>🏠 Justifier une absence</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
            <Onglets />
        </View>
    );
};

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 120,
        paddingHorizontal: 30,
        paddingTop: 40
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollViewContainer: {
        maxHeight: '100%',
        paddingHorizontal: 30,
        marginHorizontal: -30

    },
    scrollViewContent: {
        alignItems: 'flex-start',

    },
    card: {
        borderRadius: 10,
        height: 150,
        width: 250,
        padding: 15,
        marginRight: 15,
        justifyContent: 'center',
        marginTop: 20,
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFF',
    },
    buttonContainer:{
        borderRadius: 2,
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        width: 200,
    },
    buttonText:{
        fontSize: 14,
        textAlign: 'center',
    }
});

export default HomeScreen;
