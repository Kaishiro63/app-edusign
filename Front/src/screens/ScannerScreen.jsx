import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

const ScannerScreen = () => {
  const currentUser = useSelector((state) => state.user.value);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const sendPostRequest = async (userId, coursId) => {
    const requestData = {
      userId: userId,
      coursId: coursId,
    };

    try {
      const response = await fetch('https://app-edusign-back1.vercel.app/cours/present', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log('Réponse de la requête POST :', responseData);
      alert(responseData.message);
    } catch (error) {
      console.error('Erreur lors de la requête POST :', error);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const userId = currentUser ? currentUser.id : 'Unknown user';
    const coursId = data;

    sendPostRequest(userId, coursId);
    navigation.navigate('Accueil');
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setScanned(false);
            }}
          >
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => handleGoBack()}>
          <Text style={styles.btnText}>Retour</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    top: 50,
    right: 20,
    width: "30%",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F7BA09",
  },
  btnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ScannerScreen;
