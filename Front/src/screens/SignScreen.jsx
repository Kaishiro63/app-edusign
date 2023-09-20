import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const SignScreen = ({ navigation }) => {
  const ref = useRef();
  const [signaturePresent, setSignaturePresent] = useState(false);

  const handleDragEvent = () => {
    setSignaturePresent(true);
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setSignaturePresent(false);
  };

  const handleConfirm = () => {
    console.log("end");
    ref.current.readSignature();
    navigation.navigate('Scan');
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Signez ci-dessous</Text>
        <Text style={styles.description}>Veuillez fournir votre signature</Text>
      </View>

      <SignatureScreen
        ref={ref}
        onDragEvent={() => handleDragEvent()}
        webStyle={style}
      />

      <View style={styles.flex}>
        <TouchableOpacity style={styles.btnDelete} onPress={() => handleClear()}>
          <Text style={styles.btnText}>Effacer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flex}>
        <Text style={styles.title}>Vous signez en tant que monsieur XXX</Text>
        <Text style={styles.description}>Adresse mail de la personne</Text>
      </View>

      <View style={styles.flex}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleConfirm()}
        >
          <Text style={styles.btnText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  btnDelete: {
    width: "40%",
    borderRadius: 25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#DC143C",
  },
  btn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#F7BA09",
  },
  btnText: {
      color: "#FFF",
      fontWeight: "bold",
  },
});

export default SignScreen;