import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import "react-native-gesture-handler";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';


export default function Bluetooth({navigation}) {
    const [BluetoothMode, setBluetoothMode] = useState(false); // Set Bluetooth mode
    const [connectionComplete, setConnectionComplete] = useState(false); // Connection mode after completing the Bluetooth
    
    // Button Function that operate with changing the mode between Bluetooth and connectionComplete
    // bluetooth mode change, bluetooth: false -> bluetooth: true -> complete: true
    const changeMode = () => {
        setBluetoothMode(true);
        setTimeout(()=> {
            setConnectionComplete(true);
            setBluetoothMode(false);
        }, 2000)
    };
    return (
      <View style={styles.container_Bluetooth}>
        <Feather name="bluetooth" size={170} color="blue" style={styles.bluetooth_Image}/>
        <Text style={styles.connect_Text}>{BluetoothMode ? "Connecting...": connectionComplete ? "Connection succeeded !" :"Connect to your wearable device"}</Text>
        <Text style={styles.connect_SubText}>{BluetoothMode ? "If you can't connect?": connectionComplete ? "You're ready to get concentration score!":"You should have your own wearable device to get your concentration score."}</Text>
        <Text style={styles.connecting_SubText}>{BluetoothMode ? "Get help": ""}</Text>
        {BluetoothMode ? <Text></Text>:<TouchableOpacity 
        style={styles.connect_btn}
        // if connection completed, Button would be Go To Home. 
        onPress={connectionComplete ? () => navigation.goBack(): () => changeMode()}
        >
            <Text style={styles.bluetooth_text}>{connectionComplete ? "Go Home":"Connect"}</Text>
        </TouchableOpacity>}
      </View>
    );
}

const styles = StyleSheet.create({
    bluetooth_Image: {
        marginTop: -60
    },
    container_Bluetooth: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 30
    },
    connect_Text: {
        fontSize: 24,
        fontFamily: 'font-Bold',
        textAlign: 'center',
        marginTop: 85
    },
    connect_SubText: {
        fontSize: 14,
        fontFamily: 'font-Regular',
        textAlign: 'center',
        color: "#625D5D",
        marginTop: 24

    },
    connect_btn: {
        backgroundColor: '#000',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 120,
        position: 'absolute',
        bottom: 40
    },
    bluetooth_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight:'500',
        fontFamily: "font-Medium",
    },
    connecting_SubText: {
        textDecorationLine: 'underline',
        color: '#6e6e6e', 
        fontFamily: "font-Medium",
    }
});