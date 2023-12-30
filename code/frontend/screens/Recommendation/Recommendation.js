import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const place = "Starbucks";
const time = 10;

export default function Recommendation({navigation}) {

  return (
    <View style={styles.container_Recommendation}>
        <StatusBar style="auto"></StatusBar>
       <View style={styles.header}>
            <Text style={styles.recommendation_text}>
                Recommendation     
            </Text>
            <Text style={{...styles.sub_text, marginTop:10, fontFamily: 'font-Medium', fontSize: 15, color: 'grey'}}>
                for your better concentration
            </Text>
       </View>
       <View style={styles.content_Container}>
        <View style={styles.cell}>
            <Text style={styles.section_text}>Place</Text>
            <View style={styles.place_container}>
                <Text style={styles.place_Description}>{place}</Text>
            </View>
        </View>

        <View style={styles.cell}>
            <Text style={styles.section_text}>Time</Text>
            <View style={styles.time_container}>
                <Text style={styles.time_Description}>{time} {time < 12 ? "A.M.":"P.M."}</Text>
            </View>
        </View>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_Recommendation: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24
  },
  recommendation_text: {
    color: "black",
    fontSize: 20,
    fontFamily: 'font-Bold',
  },
  content_Container: {
    flex: 1,
    justifyContent: "space-around"
  },
  cell: {
    borderRadius: 18,
    paddingHorizontal: 30,
    height: 240,
    flexShrink: 0,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#D0D0D0",
    
  },
  header: {
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  section_text: {
    fontSize: 20,
    fontFamily: 'font-SemiBold',
    marginTop: 25,
  },
  place_container: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: -40
  },
  place_Description: {
    fontSize: 40,
    color: "#5B30E6",
    fontFamily: 'font-Medium',
    alignSelf: "center",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2}
  },
  time_container: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: -40,
  },
  time_Description: {
    fontSize: 40,
    color: "#5B30E6",
    fontFamily: 'font-Medium',
    alignSelf: "center",
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2}
  },
});