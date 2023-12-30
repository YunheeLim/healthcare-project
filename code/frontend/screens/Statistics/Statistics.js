import { StyleSheet, View, Dimensions} from 'react-native';
import * as React from "react";
import {Calendar} from 'react-native-calendars';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import axios from 'axios';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

// Calendar Component
const MyCalendar = ({navigation, sessionList, userId}) => {
    let sessionDates = []
    // Create the object that can use in the calendar
    if (sessionList !== null) {
        sessionDates = sessionList.reduce((acc, date) => {
            acc[date] = {marked: true};
            return acc
        }, {});
    } else {
        sessionDates = ["2023-12-24", "2023-12-25"];
    }
    
    return (
        <View style={styles.container}> 
            <Calendar 
            // Day Tap Action
                onDayPress={(day) => navigation.navigate("DailyStatistics", {id: day.dateString, navigation: navigation})}
                markedDates={{ 
                    ...sessionDates
                }} 
                theme={{ 
                    backgroundColor: '#ffffff', 
                    calendarBackground: '#ffffff', 
                    textSectionTitleColor: '#b6c1cd', 
                    selectedDayBackgroundColor: '#5B30E6', 
                    selectedDayTextColor: '#ffffff', 
                    todayTextColor: '#9F81F7',
                    dayTextColor: '#2d4150', 
                    textDisabledColor: '#d9e1e8', 
                    dotColor: '#9F81F7', 
                    selectedDotColor: '#9F81F7', 
                    arrowColor: 'black', 
                    monthTextColor: 'black', 
                    indicatorColor: 'blue', 
                    textDayFontFamily: 'font-Regular', 
                    textMonthFontFamily: 'font-Regular',  
                    textDayHeaderFontFamily: 'font-Bold',
                    textDayFontSize: 16, 
                    textMonthFontSize: 20, 
                    textDayHeaderFontSize: 14,
                    arrowStyle: {
                        width: 20, 
                        borderColor: "grey", 
                        borderWidth: 0.5, 
                        borderRadius: 5,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    dotStyle: {
                        width: 10,
                        height: 10,
                        borderRadius: 5
                    },
                    'stylesheet.day.basic': {
                        // Modifying the Day Style
                        'base': {
                            width: 30,
                            height: 50,
                            alignItems: "center",
                            justifyContent: 'center',
                        },
                    },

                }} 
                style={{
                    width:SCREEN_WIDTH,
                    margin:40,
                    flex: 1
                }}
            /> 
        </View> 
    )
}

export default function Statistics({navigation}) {
    const [userId, setUserId] = React.useState(""); // User's ID
    const [monthlySessions, setMonthlySessions] = React.useState([]); // Session Lists
    const currentDate = new Date(); // Now date
    const year = currentDate.getFullYear(); // year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // month
    const formattedDate = `${year}-${month}`; // data formatting
    const [monthDate, setMonthDate] = React.useState(Date.now().toString());

    // Get UserID, Get User's all the sessions
    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://192.168.2.212/CandY_Server/Show_UserID/',
          }).then((response) => {
            ID = response.data.user_id
            setUserId(ID);
            setMonthDate(formattedDate);
            axios({
              method: 'get',
              url: `http://192.168.2.212/CandY_Server/User_Session_All/${response.data.user_id}/`,
            }).then((response) => {
              monthlyData = response.data.User_Session_All
              setMonthlySessions(monthlyData);
            }).catch(error => console.log(error));
          }).catch(error => console.log(error));
    },[])
    
    return (
        <View style={{  
            flex: 1,  
            justifyContent: 'center',  
            alignItems: 'center',
            backgroundColor: 'white'
        }}> 
            <ExpoStatusBar style='auto' />
            {/* transfer navigation variables to Calendar */}
            <MyCalendar navigation={navigation} sessionList={monthlySessions} userId={userId} /> 
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    width: SCREEN_WIDTH,
    marginTop: 40
  },
  input: {
    height: 40,
    margin: 12, 
    borderWidth: 1,
  },
  dateText: {
    margin: 16,
  }
});