import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Document</Text>
            </View>
            <Text>Tout vos documents</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20
    },
    header: {
        marginBottom: 20,
    },
    flex: {
        display: "flex",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 50
    },
});

export default DocumentScreen;
