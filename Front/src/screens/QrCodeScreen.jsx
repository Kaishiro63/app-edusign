import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useIsFocused } from '@react-navigation/native';

const QRCodeGenerator = ({ route }) => {
  const [inputData, setInputData] = useState(null);
  const [coursDetails, setCoursDetails] = useState(null);
  const coursId = route.params?.coursId;
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://app-edusign-back1.vercel.app/cours/qr-code-generator?coursUid=${coursId}`
      );
      const data = await response.json();
      if (!data.result) {
        console.log("Erreur de fetch");
        return;
      } else {
        setInputData(data);

        // Afficher un message dans la console à chaque rafraîchissement
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourse = async () => {
    try{
      const response = await fetch(`https://app-edusign-back1.vercel.app/cours/cours-details?coursUid=${coursId}`
      );
      if(response.status !== 200) throw new Error("Erreur de fetch");
      const data = await response.json();
      if (!data.result) {
        console.log("Erreur de fetch");
        return;
      } else {
        setCoursDetails(data);
      }
    }catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();

      // Rafraîchissement toutes les 5 secondes
      const intervalId = setInterval(() => {
        fetchData();
        fetchCourse();
      }, 1000);

      return () => {
        // Nettoyer l'intervalle lorsque le composant est désassemblé ou lorsque l'écran perd le focus
        clearInterval(intervalId);
      };
    }
  }, [isFocused]);

  if(!inputData || !coursDetails) return null; 

  console.log(coursDetails.coursDetails.presents?.length)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{coursDetails.coursDetails.presents?.length}/{coursDetails.coursDetails.students?.length}</Text>

      {inputData ? (
        <QRCode
          value={inputData.QrCodeId}
          size={200}
          color="black"
          backgroundColor="white"
          key={inputData.QrCodeId}
        />
      ) : null}
    </View>
  );
};

export default QRCodeGenerator;
