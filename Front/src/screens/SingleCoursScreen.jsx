import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SingleCoursScreen = ({ route, navigation }) => {
  const { titre, start, end, intervenant, salle } = route.params;

  const handleSigner = () => {
    navigation.navigate('Sign');
  };

  const formatDateToHourMinute = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const formatDateToMMDDYY = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Retour</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.reveil}>⏰</Text>
        <View style={styles.infoContainer}>
        <Text style={styles.title}>{formatDateToHourMinute(start)} - <Text style={styles.title}>{formatDateToHourMinute(end)}</Text></Text>
          <View style={styles.timeContainer}>
            <Text style={styles.hourStart}>{formatDateToMMDDYY(start)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.salle}>🏠</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{salle}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.hourStart}>Salle</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.intervenant}>👱‍♂️</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{intervenant}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.hourStart}>Intervenant</Text>
          </View>
        </View>
      </View>
      <View style={styles.classe}>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.hourStart}>{titre}</Text>
      </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "#FFF"
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20
  },
  col: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
  },
  reveil: {
    fontSize: 28,
    backgroundColor: "#F6E2D9",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight: 10
  },
  intervenant: {
    fontSize: 28,
    backgroundColor: "#FCF1D1",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight: 10
  },
  salle: {
    fontSize: 28,
    backgroundColor: "#FCF1D1",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight: 10
  },
  classe: {
    marginTop: 20
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