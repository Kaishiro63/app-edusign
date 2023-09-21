import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from 'expo-image-picker';



const ProfilScreen = () => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  useEffect(() => {
    const handleGetUser = async () => {
      console.log("test");
      try {
        const response = await fetch(
          "https://app-edusign-back1.vercel.app/users/profile?uid=650ab8c16ea8d8449ae3be12"
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

  handleLogout = () => {
    console.log("logout");
  };

  handleChangePassword = () => {
    console.log("Change password");
  };


  return (
    <View style={screenStyles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={require('../../assets/userface.png')} resizeMode="contain" style={screenStyles.userFace}></Image>
      </TouchableOpacity>
      <Text style={screenStyles.title}>{user.prenom} {user.nom?.toUpperCase()}</Text>

      <View style={screenStyles.infosContainer}>

        <View style={screenStyles.singleInfo}>
          <View style={screenStyles.textSide}>
            <Text style={screenStyles.lightText}>Nom d'utilisateur</Text>
            <Text style={screenStyles.text}>{user.username}</Text>
          </View>
          <View style={screenStyles.iconSide}>
            <Icon name="lock" style={screenStyles.iconStyle}>
            </Icon>
          </View>
        </View>

        <View style={screenStyles.singleInfo}>
          <View style={screenStyles.textSide}>
            <Text style={screenStyles.lightText}>Email</Text>
            <Text style={screenStyles.text}>{user.email}</Text>
          </View>
          <View style={screenStyles.iconSide}>
            <Icon name="lock" style={screenStyles.iconStyle}>
            </Icon>
          </View>
        </View>

        <View style={screenStyles.singleInfo}>
          <View style={screenStyles.textSide}>
            <Text style={screenStyles.lightText}>Mot de passe</Text>
            <Text style={screenStyles.text}>*********</Text>
          </View>
          <View style={screenStyles.iconSide}>
            <TouchableOpacity onPress={handleChangePassword}>
              <Icon name="pen" style={screenStyles.iconStyleUseable}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={screenStyles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default ProfilScreen;

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 120,
        paddingHorizontal: 30,
        paddingTop: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infosContainer:{
      textAlign: 'center',
      paddingVertical: 40,
      width: '90%',

    },
    singleInfo:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5,
    },
    textSide:{
    },
    iconSide:{
      justifyContent: 'center',
    },
    lightText:{
      color:'#D3D3D3',
      fontSize: 18,
      fontWeight:'400'
    },
    text:{
      color:'black',
      fontSize: 18,
      fontWeight:'400'
    },
    iconStyle:{
      fontSize: 18,
      color: '#D3D3D3',
    },
    iconStyleUseable:{
      fontSize: 18,
      color:'#71797E',
    },
    logoutText:{
      color: 'red',
      fontSize: 18,
      fontWeight:'400',
      marginTop: 20,
    },
    userFace:{
      width: 100,
      height: 100,
      marginBottom: 20,
    }
});
