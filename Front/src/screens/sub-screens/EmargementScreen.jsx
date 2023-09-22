import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";


const EmargementScreen = ({ navigation }) => {
  const [cours, setCours] = useState([]);
  const currentUser = useSelector((state) => state.user.value);


  useEffect(() => {
    const handleGetAllCours = async () => {
      console.log("test");
      try {
        const response = await fetch(
          `https://app-edusign-back1.vercel.app/cours/mes-cours-students?userUid=${currentUser.id}`
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

  const today = new Date();
  const todayCourses = [];
  const pastCourses = [];

  cours.forEach((cours) => {
    const courseDate = new Date(cours.start);

    if (courseDate.toDateString() === today.toDateString()) {
      todayCourses.push(cours);
    } else if (courseDate < today) {
      pastCourses.push(cours);
    }
  });

  const formatDateToHourMinute = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const handleCoursePress = (cours) => {
    navigation.navigate('SingleCours', cours);
  };

  const todayCoursesJSX = todayCourses.map((cours) => {
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
  });

  const pastCoursesJSX = pastCourses.map((cours) => {
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
  });

  return (
    <ScrollView style={{flex: 1, backgroundColor: "#FFF"}}>
      <View style={styles.col}>
        <Text style={styles.sectionTitle}>Cours d'aujourd'hui</Text>
        {todayCoursesJSX}

        <Text style={styles.sectionTitle}>Cours passés</Text>
        {pastCoursesJSX}
      </View>
    </ScrollView>
  );
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5
  }
});

export default EmargementScreen;
