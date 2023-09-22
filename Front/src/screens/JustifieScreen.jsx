import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const JustifieScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [document, setDocument] = useState(null);
  const [checkBox, setCheckBox] = useState(false);

  const pickerRef = useRef(null);

  const handlePickerPress = () => {
    if (pickerRef.current) {
      pickerRef.current.togglePicker();
    }
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    Alert.alert(
      'Formulaire soumis',
      `Option sélectionnée: ${selectedOption}\nInput 1: ${input1}\nInput 2: ${input2}\nDocument: ${document}\nCase à cocher: ${checkBox}`
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
    pickerItem: {
      fontSize: 16,
      color: '#ccc',
      textAlign: 'center',
    },
  });

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.title}>Justifier une absence</Text>
      <Text style={screenStyles.text}>La demande de justification sera envoyée à un administrateur pour une validation.</Text>
      <TouchableOpacity onPress={handlePickerPress}>
        <Text style={screenStyles.text}>Justification</Text>
        <View style={screenStyles.pickerContainer}>
          <RNPickerSelect
            ref={pickerRef}
            placeholder={{ label: 'Sélectionner une justification', value: null }}
            onValueChange={handleSelectChange}
            items={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
            ]}
            value={selectedOption}
            style={{
              inputIOS: screenStyles.pickerItem,
              inputAndroid: screenStyles.pickerItem,
            }}
          />
          <Icon name="arrow-drop-down" size={24} color="black" style={screenStyles.pickerIcon} />
        </View>
      </TouchableOpacity>
      <TextInput
        value={dateDebut}
        onChangeText={(text) => setDateDebut(text)}
        placeholder="Date de début"
      />
      <TextInput
        value={dateFin}
        onChangeText={(text) => setDateFin(text)}
        placeholder="Date de fin"
      />
      <Button
        title="Sélectionner un document PDF"
        onPress={() => {
          // Implement this
        }}
      />
      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
};

export default JustifieScreen;
