import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import * as React from 'react';
import CircularProgress from '../../components/CircularProgress';
import axios from 'axios';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");

export default function SessionStatistics({route}) {
  const [sessionData, setSessionData] = React.useState({}); // Session Information
  const [concentValue, setConcentValue] = React.useState(0);  // Concentration Value
  const [userId, setUserId] = React.useState(""); // User's ID
  
  // trim the data that recieved from the server.
  const trimData = (data) => {
    let newData = {}
    Object.keys(data).map((key) => {
      if(key === "hr") {
        newData["HR"] = data["hr"]
      } else if (key === "hrv") {
        newData["HRV"] = data["hrv"]
      } else if (key === "coherence") {
        newData["Coherence"] = data["coherence"]
      } else if (key === "body_movement") {
        newData["Body Movement"] = data["body_movement"]
      } else if (key === "eda") {
        newData["EDA"] = data["eda"]
      } else if (key === "deep_sleep_minutes") {
        newData["Deep Sleep"] = data["deep_sleep_minutes"]
      } else if (key === "wrist_temperature") {
        newData["Wrist Temperature Variability"] = data["wrist_temperature"]
      }
    })
    return newData;
  }

  // Get UserID, Get Session Report
  React.useEffect(()=>{
    axios({
      method: 'get',
      url: 'http://192.168.2.212/CandY_Server/Show_UserID/',
    }).then((response) => {
      ID = response.data.user_id
      setUserId(ID);
      axios({
        method: 'get',
        url: `http://192.168.2.212/CandY_Server/Session_Report/${response.data.user_id}/${route.params.session_Id}/`,
      }).then((response) => {
        sessionsDatas = response.data.Session_Data_Avg
        setConcentValue(sessionsDatas.session_concentration_avg)
        setSessionData(trimData(sessionsDatas))
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }, [])
 
  
  return (
    <View style={styles.container_Stat}>
        <StatusBar style="auto"></StatusBar>
        <View style={styles.content_Container}>
            <View style={styles.cell}>
                <Text style={styles.section_text}>Concentration Score</Text>
                <CircularProgress percentage={concentValue}/>
            </View>
        </View>
        <ScrollView style={{flex: 1,}}>
            {/* Using data to build dynamic View */}
            {Object.keys(sessionData).map((key) => {
                return <View style={styles.cell_Session} key={key}>
                <Text style={styles.session_Text}>{key}</Text>
                <View style={{flexDirection:'row', marginTop: 10, justifyContent: "space-around"}}>
                    <Text style={styles.place}>{Math.round(sessionData[key])}</Text>
                    <Text style={styles.time}>{key === "HR" ? "bpm": key === "HRV" ? "ms": key === "EDA" ? "µS" : key === "Deep Sleep" ? "mins" : key === "Wrist Temperature Variability" ? "" : key === "Body Movement" ? "mins": ""}</Text>
                    <View style={{flex:2}}></View>
                </View>
            </View>
            })}
            
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_Stat: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24
  },
  content_Container: {
    flex: 0.7,
    justifyContent: "space-around"
  },
  cell: {
    borderRadius: 18,
    minHeight: 240,
    flexShrink: 0,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
    
  },
  cell_Session: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: 30,
    width: SCREEN_WIDTH - 48 ,
    minHeight: 102,
    flexShrink: 0,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "baseline",
    marginVertical: 10,
  },
  section_text: {
    fontSize: 18,
    fontWeight: 400,
    marginTop: 25,
    fontFamily:"font-Medium", 
  },
  section_subText: {
    fontFamily:"font-Medium",
    fontSize: 14,
    marginTop: 15,
    color: "#8B8B8B"
  },
  session_Text: {
    fontSize: 18,
    fontFamily:"font-Medium", 
  },
  place: {
    fontSize: 25,
    color: "#5B30E6",
    fontFamily: "font-Medium",
    alignSelf: "flex-end",
  },
  time: {
    fontSize: 14,
    color: "black",
    fontFamily: "font-Medium",
    marginLeft: 10,
    alignSelf:"flex-end",
    marginBottom: 2,
    
  }
});