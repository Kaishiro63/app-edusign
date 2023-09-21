import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const AdminScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const [myCours, setMyCours] = useState([]);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://app-edusign-back1.vercel.app/cours/mes-cours-admin?adminUid=650ab8c16ea8d8449ae3be12"
        );
        const data = await response.json();
        if (!data.result) {
          console.log("erreur de fetch");
          return;
        } else {
          setMyCours(data.allMyCours);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleGenerateQR = (coursId) => {
    navigation.navigate("QrCodeScreen", { courseId: coursId });
    console.log('Navigating to QrCodeScreen with courseId:', coursId);
  }

  const formatDateToHourMinute = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  console.log(myCours)
  
  const eachCours = myCours.map((cours) => {
    const { _id, description, end, intervenant, intervenantId, salle, start, students, titre, presents } = cours;
    const isAppel = presents?.length > 0;

    return (
      <TouchableOpacity onPress={() => handleGenerateQR(_id)} key={_id}>
        <View>
          <Text>{titre}</Text>
          <Text>Salle : {salle}</Text>
          <Text>
            {formatDateToHourMinute(start)} {formatDateToHourMinute(end)}
          </Text>
        </View>
        {isAppel && <Text>V</Text>}
      </TouchableOpacity>
    );
  });

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Bonjour {user?.prenom}</Text>
      <Text style={screenStyles.text}>Tous mes cours</Text>
      <ScrollView style={screenStyles.scrollViewContainer}>{eachCours}</ScrollView>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    padding: "5%",
    height: "100%",
    width: "100%",
    // backgroundColor: 'red'
  },
});

export default AdminScreen;
