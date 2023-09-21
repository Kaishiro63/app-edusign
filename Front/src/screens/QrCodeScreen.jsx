import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = ({ route }) => {
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    // Récupérer l'ID passé en paramètre depuis la route
    const idFromRoute = route.params?.courseId;
    if (idFromRoute) {
      setInputData(idFromRoute);
    } else {
      setInputData('no id');
    }
  }, [route.params?.id]);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{inputData}</Text>


      {inputData ? (
        <QRCode
          value={inputData}
          size={200}
          color="black"
          backgroundColor="white"
        />
      ) : null}
    </View>
  );
};

export default QRCodeGenerator;
