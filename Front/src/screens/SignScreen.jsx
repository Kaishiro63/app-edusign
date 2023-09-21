import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { useSelector } from "react-redux";

const SignScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.value);
  const [user, setUser] = useState([]);
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

  useEffect(() => {
    const handleGetUser = async () => {
      console.log("test");
      try {
        const response = await fetch(
          `https://app-edusign-back1.vercel.app/users/profile?uid=${currentUser.id}`
        );
        const data = await response.json();
        if (!data.result) {
          console.log("erreur de fetch");
          return;
        } else {
          setUser(data.allDataUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Émargement</Text>
        <Text style={styles.description}>Veuillez signer dans le cadre</Text>
      </View>

      <SignatureScreen
        ref={ref}
        onDragEvent={() => handleDragEvent()}
        webStyle={style}
      />

      <View style={styles.flex}>
        <TouchableOpacity style={styles.btnDelete} onPress={() => handleClear()}>
          <Text style={styles.btnTextDelete}>Effacer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flex}>
        <Text style={styles.titulaire}>Je signe en tant que <Text style={{fontWeight: 'bold', textTransform: "uppercase"}}>{user.prenom} {user.nom}</Text></Text>
        <Text style={styles.titulaire}>{user.email}</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#555',
  },
  titulaire: {
    fontSize: 15,
    maxWidth: 230,
    textAlign: "center",
    marginBottom: 5
  },
  btn: {
    width: "100%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
    marginBottom: 20,
    backgroundColor: "#F7BA09",
  },
  btnText: {
      color: "#000",
      fontWeight: "bold",
  },
  btnTextDelete: {
    marginTop: 15,
    marginBottom: 25,
    color: "#0080ff",
},
});

export default SignScreen;