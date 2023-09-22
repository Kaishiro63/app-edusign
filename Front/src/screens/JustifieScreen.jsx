import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../colors';

const JustifieScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [heureSelectionnee, setHeureSelectionnee] = useState(new Date().toLocaleTimeString());

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate !== undefined) {
      setDateDebut(selectedDate);
      setHeureSelectionnee(selectedDate.toLocaleTimeString());
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate !== undefined) {
      setDateFin(selectedDate);
      setHeureSelectionnee(selectedDate.toLocaleTimeString());
    }
  };

  const handlePickerPress = () => {
    setShowStartDatePicker(true);
  };

  const handleEndDatePickerPress = () => {
    setShowEndDatePicker(true);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    Alert.alert(
      'Formulaire soumis',
      `Option sélectionnée: ${selectedOption}\nDate de début: ${dateDebut.toDateString()}\nDate de fin: ${dateFin.toDateString()}`
    );
  };

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Justifier une absence</Text>
      <Text style={screenStyles.text}>La demande de justification sera envoyée à un administrateur pour une validation.</Text>

      <TouchableOpacity onPress={handlePickerPress}>
        <Text style={screenStyles.text}>Justification</Text>
        <TouchableOpacity style={screenStyles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Sélectionner une justification', value: null }}
            onValueChange={handleSelectChange}
            items={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
            ]}
            value={selectedOption}
          />
          <Icon name="arrow-drop-down" size={24} color="black" style={screenStyles.pickerIcon} />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={screenStyles.dateContainer}>
        <TouchableOpacity onPress={handlePickerPress}>
          <Text style={screenStyles.text}>Date de début : {dateDebut.toLocaleDateString()}, {heureSelectionnee}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={dateDebut}
            mode="datetime"
            dateFormat="day month year"
            display="compact"
            format="DD/MM/YYYY"
            onChange={handleStartDateChange}
          />
        )}
      </View>

      <View style={screenStyles.dateContainer}>
        <TouchableOpacity onPress={handleEndDatePickerPress}>
          <Text style={screenStyles.text}>Date de fin : {dateFin.toLocaleDateString()}, {heureSelectionnee}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={dateFin}
            mode="datetime"
            display="compact"
            dateFormat="day month year"
            onChange={handleEndDateChange}
          />
        )}
      </View>

      {/* Styliser le bouton Soumettre */}
      <TouchableOpacity
        style={screenStyles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={screenStyles.submitButtonText}>Soumettre</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 120,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerIcon: {
    marginLeft: 10,
    color: '#ccc',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  // Ajout de styles pour le bouton Soumettre
  submitButton: {
    backgroundColor: Colors.primaryYellow,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default JustifieScreen;
