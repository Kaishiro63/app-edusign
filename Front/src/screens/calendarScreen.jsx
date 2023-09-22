import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const [cours, setCours] = useState([]);
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}`;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const handleBackdropPress = () => {
        setModalVisible(false);
        setModalInfo(null);
    };

    const handleSwipeComplete = () => {
        setModalVisible(false);
        setModalInfo(null);
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);

        const coursDuJour = cours.filter(c => c.start.split('T')[0] === day.dateString);

        if (coursDuJour.length > 0) {
          setModalVisible(true);
          setModalInfo(coursDuJour.map(c => ({
            date: c.start.split('T')[0],
            titre: c.titre,
            start: c.start,
            end: c.end,
            salle: c.salle,
            intervenant: c.intervenant
          })));
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

    const generateTimeSlots = (start, end) => {
        const startTime = parseInt(start.split(':')[0]);
        const endTime = parseInt(end.split(':')[0]);
        const timeSlots = [];

        for (let i = startTime; i < endTime; i++) {
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
            <View style={styles.header}>
                <Text style={styles.title}>Calendrier</Text>
            </View>
            <Calendar
                current={todayString}
                markedDates={markedDates}
                onDayPress={onDayPress}
            />
            <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={handleBackdropPress} swipeDirection="down" onSwipeComplete={handleSwipeComplete}>
                <View style={styles.modalContent}>
                    {modalInfo && (
                        <>
                        <Text style={styles.modalTitle}>Détails du {formatDate(modalInfo[0].date)}</Text>
                            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Fermer</Text>
                            </TouchableOpacity>
                            {modalInfo.map(c => (
                                <View key={c.start}>
                                    <Text style={styles.secondTitle}>Cours: {c.titre}</Text>
                                    <Text style={styles.info}>Salle: {c.salle}</Text>
                                    <Text style={styles.info}>Intervenant: {c.intervenant}</Text>
                                    <View style={styles.timeSlots}>
                                        {generateTimeSlots(c.start.split('T')[1], c.end.split('T')[1]).map(time => (
                                            <View key={time} style={[styles.timeSlot, occupiedTimeSlots.includes(time) && styles.occupiedTimeSlot]}>
                                                <Text>{time}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20
    },
    header: {
        marginBottom: 20,
    },
    flex: {
        display: "flex",
        justifyContent: "space-between"
    },
    secondTitle: {
        fontSize: 18,
        marginTop: 30,
        fontWeight: "bold",
        marginBottom: 5
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 50
    },
    info: {
        fontSize: 16,
        color: '#AAAAAA',
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
        paddingBottom: 40
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
        backgroundColor: '#F7BA09',
    },
    closeButton: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 16,
    },
});

export default CalendarScreen;
