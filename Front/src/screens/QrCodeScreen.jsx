import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useIsFocused } from '@react-navigation/native';

const QRCodeGenerator = ({ route }) => {
  const [inputData, setInputData] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const courseIdFromRoute = route.params?.courseId;
      if (courseIdFromRoute) {
        setInputData(courseIdFromRoute);
      } else {
        setInputData('no courseId');
      }
    }
  }, [isFocused, route.params?.courseId]);

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
