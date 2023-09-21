import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SingleCoursScreen = ({ route, navigation }) => {
  const { titre, start, end, intervenant, salle } = route.params;

  const handleSigner = () => {
    navigation.navigate('Sign');
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Retour</Text>
      </TouchableOpacity>
      <Text>Titre : {titre}</Text>
      <Text>Start : {start}</Text>
      <Text>End : {end}</Text>
      <Text>End : {intervenant}</Text>
      <Text>End : {salle}</Text>
      <View style={styles.flex}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleSigner()}
        >
          <Text style={styles.btnText}>Signer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
    marginBottom: 20,
    backgroundColor: "#F7BA09",
  },
  btnText: {
      color: "#000",
      fontWeight: "bold",
  },
});

export default SingleCoursScreen;