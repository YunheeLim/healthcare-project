import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';

let ID = "teamhot"

export default function Profile({navigation}) {
  const [ID, setID] = useState("teamhot") // user's ID
  
    axios({
      // Get data from the server.
      method: 'get',
      url: 'http://192.168.2.212/CandY_Server/Show_UserID/',
    }).then((response) => {
      ID = response.data.user_id;
      setId(ID);
    }).catch(error => console.log(error));

  return (
    <View style={styles.container_Profile}>
        <StatusBar style="auto" />
        <View style={styles.header}>
            <Text style={styles.profile_text}>
                My account
            </Text>
        </View>
      <View style={styles.cell}>
        <Text style={styles.sub_text}>
            ID
        </Text>
        <Text style={{...styles.sub_text, color:"grey"}}>
            {ID}
        </Text>
      </View>
      <View style={styles.separator}></View>
      <TouchableOpacity 
        onPress={() => navigation.popToTop()}
        style={styles.cell}
      >
        <Text style={styles.sub_text}>
            Log out
        </Text>
        <TouchableOpacity>
            <Entypo name="chevron-right" size={20} color="grey" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.separator}></View>
      <TouchableOpacity 
        onPress={() => Alert.alert('Are you sure?', 'Do you really want to delete your account?', [
          {
            text: 'No',
            onPress: () => console.log('No'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => navigation.popToTop(),
            style: 'destructive'
        }])}
        style={styles.cell}
      >
        <Text style={{...styles.sub_text, color:"red"}}>
            Delete my account
        </Text>
        <TouchableOpacity>
        <Entypo name="chevron-right" size={20} color="grey" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.separator}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_Profile: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  sub_text: {
    fontSize: 16,
    fontFamily: 'font-Medium',
  },
  profile_text: {
    color: "black",
    fontSize: 20,
    fontFamily: 'font-Bold',
  },
  separator: {
    height: 1,
    backgroundColor: "grey",
    marginHorizontal: 10,
    opacity: 0.2
  },
  cell: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 57,
  },
  header: {
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
});