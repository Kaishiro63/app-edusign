import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useIsFocused } from '@react-navigation/native';

const QRCodeGenerator = ({ route }) => {
  const [inputData, setInputData] = useState(null);
  const coursId = route.params?.coursId;
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://app-edusign-back1.vercel.app/cours/cours-details?coursUid=${coursId}`
      );
      const data = await response.json();
      if (!data.result) {
        console.log("Erreur de fetch");
        return;
      } else {
        setInputData(data.coursDetails);

        // Afficher un message dans la console à chaque rafraîchissement
        console.log('Le code QR a été actualisé.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();

      // Rafraîchissement toutes les 5 secondes
      const intervalId = setInterval(() => {
        fetchData();
      }, 5000);

      return () => {
        // Nettoyer l'intervalle lorsque le composant est désassemblé ou lorsque l'écran perd le focus
        clearInterval(intervalId);
      };
    }
  }, [isFocused]);

  if(!inputData) return null;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{inputData._id}</Text>
      <Text>{inputData.presents?.length}/{inputData.students?.length}</Text>

      {inputData ? (
        <QRCode
          value={inputData._id}
          size={200}
          color="black"
          backgroundColor="white"
          key={inputData._id}
        />
      ) : null}
    </View>
  );
};

export default QRCodeGenerator;
