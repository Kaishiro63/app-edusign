import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector } from "react-redux";

const AdminFormScreen = ({navigation}) => {
  const currentUser = useSelector((state) => state.user.value);
  const [title, setTitle] = useState("");
  const [salle, setSalle] = useState("");
  const [intervenant, setIntervenant] = useState("");
  const [description, setDescritpion] = useState("");

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showStartTimePicker, setShowStartTimePicker] = useState(true);

  const [selectedClasse, setselectedClasse] = useState(null);
  const [allStudents, setAllStudents] = useState(null);
  const [selectedStudentsIdFromClasse, setSelectedStudentsIdFromClasse] = useState([]);

  const AllClasseDisponible = [
    { key: "MBA Fullstack", value: "MBA Fullstack" },
    { key: "MBA WebDesign", value: "MBA WebDesign" },
  ];

  const handleStartChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate !== undefined) {
      setDateStart(selectedDate);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(Platform.OS === "ios");
    if (selectedTime !== undefined) {
      setDateEnd(selectedTime);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://app-edusign-back1.vercel.app/users/all-students");
        const data = await response.json();
        if (!data.result) {
          console.log("erreur de fetch");
          return;
        } else {
          setAllStudents(data.allUsers);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedClasse) {
      const filteredStudents = allStudents.filter((student) => student.classe === selectedClasse);
      const studentIds = filteredStudents.map((student) => student._id);
      setSelectedStudentsIdFromClasse(studentIds);
    } else {
      setSelectedStudentsIdFromClasse([]);
    }
  }, [selectedClasse]);

  const handleCreateCours = async () => {
    const body = {
      start: dateStart,
      end: dateEnd,
      intervenant: intervenant,
      intervenantId: currentUser.id,
      titre: title,
      description: description,
      salle: salle,
      students: selectedStudentsIdFromClasse,
    };

    try {
      const response = await fetch("https://app-edusign-back1.vercel.app/cours/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setTitle("");
      setSalle("");
      setIntervenant("");
      setDescritpion("");
      setDateStart(new Date());
      setDateEnd(new Date());
      setselectedClasse(null);

      navigation.navigate('Mes cours', { refresh: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Créer un cours</Text>
      <View style={styles.form}>
        <View style={styles.inputContainerDate}>
          <Text style={styles.titleDate}>Séléctionnez l'heure de début du cours :</Text>
          {showDatePicker && (
            <DateTimePicker
              value={dateStart}
              mode="datetime"
              display="compact"
              onChange={handleStartChange}
            />
          )}
        </View>
        <View style={styles.inputContainerDate}>
          <Text style={styles.titleDate}>Séléctionnez l'heure de fin du cours :</Text>
          {showStartTimePicker && (
            <DateTimePicker
              value={dateEnd}
              mode="datetime"
              display="compact"
              onChange={handleEndTimeChange}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Titre du cours"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="salle"
            onChangeText={(text) => setSalle(text)}
            value={salle}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Intervenant"
            onChangeText={(text) => setIntervenant(text)}
            value={intervenant}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Descritpion"
            onChangeText={(text) => setDescritpion(text)}
            value={description}
          />
        </View>
        <SelectList
          data={AllClasseDisponible}
          setSelected={(option) => setselectedClasse(option)}
          save="key"
          placeholder="Sélectionnez une classe"
          search={false}
        />
      </View>
      <TouchableOpacity onPress={() => handleCreateCours()} style={styles.button}>
        <Text style={styles.buttonText}>Créer le cours</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  form: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainerDate: {
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  titleDate: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F7BA09",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default AdminFormScreen;
