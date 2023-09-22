import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

const AdminScreen = ({ navigation, route }) => {
  const [user, setUser] = useState();
  const [myCours, setMyCours] = useState([]);
  const currentUser = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  console.log(isFocused);

  const compareCours = (coursA, coursB) => {
    const colorA = determineCourseColor(coursA.start, coursA.end);
    const colorB = determineCourseColor(coursB.start, coursB.end);

    if (colorA === 'green' && colorB === 'red') {
      return -1;
    } else if (colorA === 'red' && colorB === 'green') {
      return 1;
    } else {
      const startA = new Date(coursA.start);
      const startB = new Date(coursB.start);
      return startA - startB;
    }
  };

  // const refreshData = () => {
  //   console.log('La page a été actualisée.');
  // };

  // useEffect(() => {
  //   if (route.params && route.params.refresh) {
  //     refreshData();
  //   }
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://app-edusign-back1.vercel.app/cours/mes-cours-admin?adminUid=${currentUser.id}`
        );
        const data = await response.json();
        if (!data.result) {
          console.log("Erreur de fetch");
          return;
        } else {
          setMyCours(data.allMyCours);
          console.log("Cours chargés :", data.allMyCours);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    const handleGetUser = async () => {
      console.log("test");
      try {
        const response = await fetch(
          `https://app-edusign-back1.vercel.app/users/profile?uid=${currentUser.id}`
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
      return 'green';
    } else {
      return 'red';
    }
  };

  const handleGenerateQR = (coursId) => {
    navigation.navigate("QrCodeScreen", { coursId });
    console.log('Navigating to QrCodeScreen with courseId:', coursId);
  };

  const sortedCours = [...myCours].sort(compareCours);

  const eachCours = sortedCours.map((cours) => {
    const { _id, salle, start, end, titre, presents } = cours;
    const courseColor = determineCourseColor(start, end);

    const handlePress = () => {
      if (courseColor === 'green') {
        handleGenerateQR(_id);
      }
    };

    return (
      <TouchableOpacity onPress={handlePress} key={_id} disabled={courseColor !== 'green'} style={screenStyles.containerCours}>
      <Text style={screenStyles.book}>📖</Text>
        <View style={screenStyles.infoContainer}>
          <Text style={{ color: courseColor, ...screenStyles.secondTitle }}>{cours.secondTitle || titre}</Text>
          <Text style={{ color: courseColor, ...screenStyles.hourStart }}>Salle : {salle}</Text>
          <Text style={{ color: courseColor, ...screenStyles.hourStart }}>
            {formatDateToHourMinute(start)} - {formatDateToHourMinute(end)}
          </Text>
        </View>
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
    padding: 20,
    paddingTop: 40
  },
  containerCours: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF"
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
  secondTitle: {
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
  title: {
    fontSize: 32,
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
