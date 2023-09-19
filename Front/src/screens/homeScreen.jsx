import React, { useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
const HomeScreen = () => {
    const [cards, setCards] = useState([1, 2, 3]); // Initial array of cards

    const removeCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1); // Remove the card at the specified index
        setCards(updatedCards); // Update the state to reflect the removed card
    };

    return (
        <View style={screenStyles.container}>
            <Text style={screenStyles.title}>Bonjour X</Text>

            <View>
                <ScrollView
                    horizontal={true}
                    directionalLockEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={screenStyles.scrollViewContent}
                    style={screenStyles.scrollViewContainer}
                >
                    {cards.map((card, index) => (
                        <TouchableOpacity key={index} style={screenStyles.card}>
                            <Text style={screenStyles.text}>Conseezkrjezikerjziezjerjil N°{card}</Text>
                            <TouchableOpacity
                                style={screenStyles.closeButton}
                                onPress={() => removeCard(index)} // Call removeCard function on press
                            >
                            <Text style={screenStyles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={{display: 'flex', justifyContent: 'flex-start'}}>
                    <TouchableOpacity style={screenStyles.buttonContainer}>
                        <Text style={screenStyles.buttonText}>🏠 Justifier une absence</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 120,
        paddingHorizontal: 30,

    },
    title: {
        fontSize: 30,
    },
    text: {
        fontSize: 20,
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
        backgroundColor: 'orange',
        borderRadius: 25,
        height: 150,
        width: 200,
        padding: 15,
        marginRight: 15,
        justifyContent: 'center'
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
        color: 'white'
    },
    buttonContainer:{
        backgroundColor: 'orange',
        padding: 15,
        marginHorizontal: 'auto',
        alignItems: 'center',
        width: '65%'
    },
    buttonText:{
        fontSize: 18
    }
});

export default HomeScreen;
