import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfilScreen = () => {
  const [user, setUser] = useState([]);

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
      <Text style={screenStyles.title}>{user.prenom} {user.nom.toUpperCase()}</Text>
    </View>
  )
};

export default ProfilScreen;

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 120,
        paddingHorizontal: 30,
        justifyContent: 'center',

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
