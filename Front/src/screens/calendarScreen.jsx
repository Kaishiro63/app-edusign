import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const [cours, setCours] = useState([]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);

        const coursDuJour = cours.find(c => c.start.split('T')[0] === day.dateString);

        if (coursDuJour) {
          setModalVisible(true);
          setModalInfo({
            date: coursDuJour.start.split('T')[0],
            titre: coursDuJour.titre,
            start: coursDuJour.start,
            end: coursDuJour.end,
          });
        } else {
          setModalVisible(false);
          setModalInfo(null);
        }
    };

    const markedDates = {};

    cours.forEach((c) => {
        const date = c.start.split('T')[0];
        markedDates[date] = { selected: true };
    });

    const generateTimeSlots = () => {
        const timeSlots = [];
        for (let i = 8; i <= 18; i++) {
          const time = `${i < 10 ? '0' + i : i}:00`;
          timeSlots.push(time);
        }
        return timeSlots;
    };

    useEffect(() => {
        const handleGetAllCours = async () => {
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

    const occupiedTimeSlots = [];
    cours.forEach((c) => {
        const startTime = parseInt(c.start.split('T')[1].split(':')[0]);
        const endTime = parseInt(c.end.split('T')[1].split(':')[0]);
        for (let i = startTime; i < endTime; i++) {
            occupiedTimeSlots.push(`${i < 10 ? '0' + i : i}:00`);
        }
    });

    return (
        <View style={styles.container}>
            <Calendar
                current={'2023-09-21'}
                markedDates={markedDates}
                onDayPress={onDayPress}
            />
            <Modal isVisible={isModalVisible} style={styles.modal}>
                <View style={styles.modalContent}>
                    {modalInfo && (
                    <>
                        <Text style={styles.modalTitle}>Détails du {modalInfo.date}</Text>
                        <Text>Titre du cours: {modalInfo.titre}</Text>
                        <View style={styles.timeSlots}>
                        {generateTimeSlots().map(time => (
                            <View key={time} style={[styles.timeSlot, occupiedTimeSlots.includes(time) && styles.occupiedTimeSlot]}>
                            <Text>{time}</Text>
                            </View>
                        ))}
                        </View>
                    </>
                    )}
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeSlots: {
    flexDirection: 'column',
    marginTop: 10,
  },
  timeSlot: {
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  occupiedTimeSlot: {
    backgroundColor: '#FFB6C1',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default CalendarScreen;
