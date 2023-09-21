import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const JustifieScreen = () => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [document, setDocument] = useState(null);
  const [checkBox, setCheckBox] = useState(false);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    Alert.alert(
      'Formulaire soumis',
      `Option sélectionnée: ${selectedOption}\nInput 1: ${input1}\nInput 2: ${input2}\nDocument: ${document}\nCase à cocher: ${checkBox}`
    );
  };

  return (
    <View>
      <Text>Justifier une absence</Text>
      <Text>La demande de justification sera envoyée à un administrateur pour une validation.</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedOption(value)}
        items={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}
        value={selectedOption}
      />
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
        }}
      />
      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
};

export default JustifieScreen;
