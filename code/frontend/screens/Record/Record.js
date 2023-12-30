import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import * as React from "react";
import axios from 'axios';

// The screen that the user can record work-session
export default function RecordScreen({navigation}) {
    
    // Manage values as states
    const [id, setId] = useState("TeamHoT");
    const [place, setPlace] = useState(""); // The input data about where the user works
    const [seconds, setSeconds] = useState(0); // The time the user working
    const [isRunning, setIsRunning] = useState(false); // Whether the stop watch is active or not
    const [startTime, setStartTime] = useState(""); // The time when the user starts working
    const [finishTime, setFinishTime] = useState(""); // The time when the user ends working
    const [validPlace, setValidPlace] = useState(false); // Whether the where data exists or not
    const [validTime, setValidTime] = useState(false); // Whether the time data existes or not
    const [submitMode, setSubmitMode] = useState(false); // Turns true when the submit button is pressed

    // Set values as the value is typed.
    const onChangePlace = (val) =>{
        setPlace(val);
    }

    // Get user's id from the server
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://192.168.2.212/CandY_Server/Show_UserID/',
          }).then((response) => {
            setId(response.data.user_id);
          })
    }, []);

    // Handle the stop watch
    useEffect(() => {

        let interval;

        if (isRunning) { // When the stop watch is running
            interval = setInterval(() => {
                setSeconds(seconds+ 1); // Count up every second
            }, 1000);
        }else if (!isRunning && (seconds !== 0)){ // When the stop watch is reset
            clearInterval(interval); // Reset the time
        }
        return () => clearInterval(interval);

    }, [isRunning, seconds]);

    // Manage the place value and submit state at the same time
    useEffect(() => {
        if (place !== ""){ // When the place is typed
            setValidPlace(true);
        }else if (place === "" && !submitMode){ // When the place is not typed and not in the submit mode
            setValidPlace(true);
        }
    }, [place]);

    // Manage the start time value and submit state at the same time
    useEffect(() => {
        if(startTime !== ""){ // When the start time is pressed
            setValidTime(true);
        }else if(startTime === "" && !submitMode){ // When the start time is not pressed and not in the submit mode
            setValidTime(true);
        }
    }, [startTime]);

    // Is called when the start/stop button is pressed
    const handleStartStop = () => {

        // When the session starts.
        if (seconds == 0){
            // Make the date format in MySQL DATETIME foramt
            const start_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
            setStartTime(start_time);
        }
        setIsRunning(!isRunning);
    };

    // Is called when the submit button is pressed
    const handleSubmit = async () => {
        setSubmitMode(true);

        if (place === ""){ // When the place is not typed
            setValidPlace(false);
        }
        if (startTime === ""){ // When the start time button is not pressed
            setValidTime(false);
        }
        if (place !== "" && startTime !== ""){ // When all data is valid
            
            // Make the date format in MySQL DATETIME foramt
            const finish_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
            setFinishTime(finish_time);

            setValidPlace(true);
            setValidTime(true);

            // Send data to the server.
            axios.post('http://192.168.2.212/CandY_Server/Create_Session_Result/', {
                "user_id": id,
                "session_place": place, 
                "session_start_time": startTime, 
                "session_end_time": finish_time,
            })
            .then((response)=>{
                // Reset all the values.
                setSeconds(0);
                setIsRunning(false);
                setPlace("");
                setStartTime("");
                setFinishTime("");
            }).catch((e)=>console.log(e));
        }
    };

    // Make the time in HH:MM:SS format
    const formatTime = ( time ) => {
        // Parse milliseconds time to hours, minutes, seconds
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const second = time % 60;

        // Make digits of each element to 2.
        const hourStr = String(hours).padStart(2, '0');
        const minuteStr = String(minutes).padStart(2, '0');
        const secondStr = String(second).padStart(2, '0');

        return (`${hourStr} : ${minuteStr} : ${secondStr}`);
    }

    return (
        <View style={styles.container_RecordScreen}>

            <View style={styles.header}>
                <TouchableOpacity
                    // Navigate to the home screen
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={styles.arrow}
                >
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.header_text}>Record Task</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.container_where}>
                    <Text style={styles.where_text}>Where?</Text>
                    <View>
                        <TextInput 
                            onChangeText={onChangePlace}
                            value={place}
                            style={{
                                ...styles.input_box, 
                                // If the place is not valid, change the field color into red
                                borderColor: (validPlace ? styles.input_box.borderColor : 'red'),
                                borderWidth: (validPlace ? styles.input_box.borderWidth : 1),
                                }}
                        />
                    
                    </View>
                </View>

                <View style={styles.container_timer}>
                    <View style={styles.circle_outside}>
                        <View style={styles.circle_inside}>
                            <Text style={styles.timer_text}>{formatTime(seconds)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container_button}>
                    <TouchableOpacity 
                        onPress={handleStartStop}
                        style={{
                            ...styles.button,
                            // If the place is not valid, change the button color into red
                            backgroundColor: (validTime ? styles.button.backgroundColor : 'red'),
                        }}
                    >
                        <Text style={styles.btn_text}>
                            {/* Change the text as the state of the stop watch */}
                            {isRunning ? "Stop" : "Start" }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <Text style={styles.btn_text}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container_RecordScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 45,
    },
    arrow: {
        marginRight: 80,
    },
    header_text:{
        fontFamily: 'font-SemiBold',
        fontSize: 22,
        marginRight: 110,
    },
    body: {
        flex: 10,
    },
    container_where: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    where_text: {
        fontFamily: 'font-Medium',
        fontSize: 25,
    },
    input_box: {
        borderRadius: 10,
        marginLeft: 20,
        width: 180,
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexShrink: 0,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#D0D0D0",   
    },
    container_timer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle_outside: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: '#F2EFFB',
    },
    circle_inside: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'white',
    },
    timer_text: {
        fontFamily: 'font-Bold',
        fontSize: 30,
    },
    container_button: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        justifyContent: 'center',
        marginVertical: 75,
        marginHorizontal: 20,
        paddingHorizontal: 40,
        backgroundColor: '#000',
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowOffset: {width: 2, height: 2},
      },
    btn_text: {
        color: 'white',
        fontFamily: 'font-Medium',
        fontSize: 18,
    }
});