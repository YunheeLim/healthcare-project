import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CircularProgress from '../../components/CircularProgress';
import axios from 'axios';

// The screen that shows the average concentration for today
export default function Home({navigation}) {

    const [id, setId] = useState("teamhot"); // user's ID
    const [score, setScore] = useState(0); // user's concentration score for today

    // Get user's ID and concentration score from the server
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://192.168.2.212/CandY_Server/Show_UserID/',
          }).then((response) => {
            setId(response.data.user_id);
          }).catch(error => console.log(error));
        axios({
        method: "get",
        url: "http://192.168.2.212/CandY_Server/Today_Avg/",
        })
        .then((response) => {
            setScore(response.data.today_concentration_avg);
        })
        .catch((error) => console.log(error));
    }, []);

    const date = new Date();

    // Get current hour for welcome text
    const current_hour = date.getHours();

    // Format the date
    const today = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    
    // Change the welcome message depending on the time
    let welcome_text = "Hello,"

    if (6 <= current_hour && current_hour < 12){
        welcome_text = "Good Morning,";
    }else if (12 <= current_hour && current_hour < 18){
        welcome_text = "Good Afternoon,";
    }else if (18 <= current_hour && current_hour < 24){
        welcome_text = "Good Evening,";
    }else if (0 <= current_hour && current_hour < 6){
        welcome_text = "Good Night,";
    }

    return (
      <View style={styles.container_Home}>

        <View style={styles.header}>
            <View style={styles.welcome}>
                <Text style={styles.welcome_text}>{welcome_text}</Text>
                <Text style={styles.id_text}>{id}</Text>
            </View>
            <View style={styles.watch_icon}>
                <TouchableOpacity
                // Navigate to the bluetooth screen
                onPress={() => navigation.navigate('Bluetooth')}
                >
                    <View style={styles.icon_circle}>
                        <MaterialCommunityIcons name="watch-variant" size={24} color="#5B30E6" style={{position: 'absolute'}}/>
                    </View>
                </TouchableOpacity>

            </View>
        </View>

        <View style={styles.body}>
            <TouchableOpacity 
                style={styles.cell}
                // Navigate to the daily statistics screen
                onPress={() => navigation.navigate('DailyStatistics', {id: today, navigation: navigation})}
            >
                <Text style={styles.concentration_score_text}>Concentration Score</Text>  
                <Text style={styles.for_yesterday_text}>for today</Text>            
                <CircularProgress percentage={score} radius={80} />
            </TouchableOpacity>
            <View style={styles.container_record}>
                <TouchableOpacity 
                    // Navigate to the record screen
                    onPress={() => navigation.navigate('RecordScreen')}
                    style={styles.record_btn}
                >
                    <Text style={styles.record_text}>Record Task</Text>                    
                </TouchableOpacity>

            </View>
        </View>

      </View>
    );
}

const styles = StyleSheet.create({
    container_Home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 40,
        marginTop: 30,
    },
    welcome: {
        flex: 3,
        justifyContents: 'center',
    },
    welcome_text: {
        fontSize: 15,
        fontFamily: 'font-Medium',
        color: 'grey',
    },
    id_text: {
        marginTop: 3,
        fontSize: 25,
        fontFamily: 'font-Bold',
    },
    icon_circle: {     
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#D0D0D0",
    },
    watch_icon: {
        flex: 1,
        alignItems: 'flex-end',
    },
    body: {
        flex: 5,
        justifyContent: 'center',
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        paddingHorizontal: 50,
        marginTop: 25,
        height: 240,
        flexShrink: 0,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#D0D0D0",
    },
    concentration_score_text: {
        marginTop: 20,
        marginHorizontal: -70,
        fontSize: 22,
        fontFamily: 'font-Bold',
    },
    for_yesterday_text: {
        marginTop: 5,
        marginHorizontal: 80,
        marginBottom: 20,
        fontSize: 18,
        fontFamily: 'font-Regular',
        color: 'grey',
    },
    container_record: {
        justifyContent: 'center',
        marginVertical: 80,
    },
    record_btn: {
        backgroundColor: '#000',
        borderRadius: 10,
        paddingVertical: 18,
        marginVertical: 20,
        marginHorizontal: 50,
        alignItems: 'center',
        shadowOpacity: 0.5,
        shadowOffset: {width: 2, height: 2},
    },
    record_text: {
        color: 'white',
        fontFamily: 'font-Medium',
        fontSize: 18,
    },
});