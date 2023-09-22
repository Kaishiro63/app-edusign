import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector } from "react-redux";

const AdminFormScreen = () => {
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
      const data = response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Créer un cours</Text>
      <View style={styles.form}>
        <View style={styles.inputContainerDate}>
          <Text style={styles.titleDate}>heure de debut : {dateStart.toDateString()}</Text>
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
          <Text style={styles.titleDate}>heure de fin : {dateEnd.toLocaleTimeString()}</Text>
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
      <TouchableOpacity onPress={() => handleCreateCours()}>
        <Text>Creation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  titleDate: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "90%",
  },
  inputContainerDate: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "90%",
    padding: 10,
  },
  input: {
    padding: 10,
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default AdminFormScreen;
