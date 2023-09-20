import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SignatureCapture from 'react-native-signature-canvas';

const SignatureScreen = ({ navigation }) => {
  const signatureRef = useRef();

  const handleSaveSignature = () => {
    const signatureData = signatureRef.current.saveImage();
    navigation.navigate('ScannerScreen', { signatureData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Signez ci-dessous</Text>
        <Text style={styles.description}>Veuillez fournir votre signature</Text>
      </View>
      <SignatureCapture
        ref={signatureRef}
        onSaveEvent={handleSaveSignature}
        saveImageFileInExtStorage={false}
        showNativeButtons={false}
        showTitleLabel={false}
        clearText="Effacer"
        style={{
          backgroundColor: 'red',
          borderRadius: 2,
          padding: 2,
        }}
      />
      <View>
        <Text style={styles.title}>Signez ci-dessous</Text>
        <Text style={styles.description}>Veuillez fournir votre signature</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSaveSignature}>
          <Text style={styles.button}>Continuer</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default SignatureScreen;
