import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const EmargementScreen = () => {
  const [cours, setCours] = useState([]);

  useEffect(() => {
    const handleGetAllCours = async () => {
      console.log("test");
      try {
        const response = await fetch(
          "https://app-edusign-back1.vercel.app/cours/mes-cours-students?userUid=650ab94c6ea8d8449ae3be18"
        );
        const data = await response.json();
        if (!data.result) {
          console.log("erreur de fetch");
          return;
        } else {
          setCours(data.cours);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllCours();
  }, []);

  const formatDateToHourMinute = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const allCourses = cours.map((cours) => {
      return (
        <TouchableOpacity>
          <Text>{cours.titre}</Text>
          <Text>{formatDateToHourMinute(cours.start)}</Text>
          <Text>{formatDateToHourMinute(cours.end)}</Text>
        </TouchableOpacity>
      );
  })


  return (
    <View>
      <Text>{allCourses}</Text>
    </View>
  )
};

export default EmargementScreen;
