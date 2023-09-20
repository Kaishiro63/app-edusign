import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const EmargementScreen = () => {

useEffect(() => {
    const handleGetAllcours = async () => {
        console.log('test')
      try {
        const fetch = await fetch("https://app-edusign-back1.vercel.app/cours/mes-cours-students?userUid=650ab94c6ea8d8449ae3be18");
        const allCours = await fetch.json();
        if (!data.result) {
          console.log('erreur de fetch')
          return;
        } else {
          console.log(data.cours)
        }
  
      }
      catch (error) {
        console.log(error)
  
      }
    }
  
    handleGetAllcours();
  }, []);



 return (
    <View>
    <Text>Emargement</Text>
</View>
 )
};

export default EmargementScreen;