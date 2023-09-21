import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const AdminScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [myCours, setMyCours] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://app-edusign-back1.vercel.app/cours/mes-cours-admin?adminUid=650ab8c16ea8d8449ae3be12"
        );
        const data = await response.json();
        if (!data.result) {
          console.log("Erreur de fetch");
          return;
        } else {
          setMyCours(data.allMyCours);
          console.log("Cours chargés :", data.allMyCours); // Ajout de cette ligne
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const formatDateToHourMinute = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const determineCourseColor = (start, end) => {
    const now = new Date();
    const courseStart = new Date(start);
    const courseEnd = new Date(end);

    if (now >= courseStart && now <= courseEnd) {
      return 'green'; // Le cours est en cours
    } else {
      return 'red'; // Le cours n'est pas en cours
    }
  };

  const handleGenerateQR = (coursId) => {
    navigation.navigate("QrCodeScreen", { courseId: coursId });
    console.log('Navigating to QrCodeScreen with courseId:', coursId);
  };

  const eachCours = myCours.map((cours) => {
    const { _id, salle, start, end, titre, presents } = cours;
    const isAppel = presents?.length > 0;
    const courseColor = determineCourseColor(start, end);

    const handlePress = () => {
      // Naviguer uniquement si le cours est en cours
      if (courseColor === 'green') {
        handleGenerateQR(_id);
      }
    };

    return (
      <TouchableOpacity onPress={handlePress} key={_id} disabled={courseColor !== 'green'}>
        <View style={{ borderColor: courseColor, borderWidth: 2, padding: 10, marginBottom: 10 }}>
          <Text style={{ color: courseColor }}>{titre}</Text>
          <Text style={{ color: courseColor }}>Salle : {salle}</Text>
          <Text style={{ color: courseColor }}>
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
  },
});

export default AdminScreen;
