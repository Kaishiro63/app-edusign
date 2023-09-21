import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EmargementScreen = ({ navigation }) => {
  const [cours, setCours] = useState([]);

  useEffect(() => {
    const handleGetAllCours = async () => {
      console.log("test");
      try {
        const response = await fetch(
          "https://app-edusign-back1.vercel.app/cours/mes-cours-students?userUid=650ab94c6ea8d8449ae3be18"
        );
        const data = await response.json();
        if (!data.result) {
          console.log("erreur de fetch");
          return;
        } else {
          setCours(data.cours);
          console.log(data.cours);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllCours();
  }, []);

  console.log(cours);

  const formatDateToHourMinute = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const handleCoursePress = (cours) => {
    navigation.navigate('SingleCours', cours);
  };

  const allCourses = cours.map((cours) => {
      return (
        <TouchableOpacity key={cours.id} style={styles.container} onPress={() => handleCoursePress(cours)}>
          <Text style={styles.book}>📖</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{cours.titre}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.hourStart}>{formatDateToHourMinute(cours.start)} - <Text style={styles.hourEnd}>{formatDateToHourMinute(cours.end)}</Text></Text>
            </View>
          </View>
        </TouchableOpacity>
      );
  })

  return (
    <View style={styles.col}>
      {allCourses}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF"
  },
  col: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
  },
  book: {
    fontSize: 28,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight: 10
  },
  infoContainer: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  hourStart: {
    marginRight: 10,
    color: '#AAAAAA',
  },
  hourEnd: {
    color: '#AAAAAA',
  },
});

export default EmargementScreen;
