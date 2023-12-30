import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import "react-native-gesture-handler";
import { Image } from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

// The screen that the user sees first when the app is executed.
export default function LaunchScreen({navigation}) {

  return (
    <View style={styles.container_LaunchScreen}>
      <View style={styles.container_LaunchScreen}>
        {/* Make the gradient color of the title. */}
        <MaskedView
              maskElement={<Text style={styles.CandY_text}>CandY</Text>
            }>
           <LinearGradient
              locations={[0, 1]}
              colors={['#0080FF', '#8000FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
            <Text style={[styles.CandY_text, {opacity:0}]}>CandY</Text>
          </LinearGradient>
        </MaskedView>

        <Text style={styles.sub_text}>Concentration and You!</Text>
        {/* Get an image from the Internet */}
        <Image 
          source="https://i.pinimg.com/564x/21/92/e7/2192e7faff6fd0106191b68e3700cd79.jpg"
          style={{width: 200, height: 200, marginVertical: 40}}
        />
        <TouchableOpacity 
          style={styles.sign_in_btn}
          // Navigate to the sign in screen page
          onPress={() => navigation.navigate('SignInScreen')}
        >
          <Text style={styles.sign_in_text}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // Navigate to the sign up screen page
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text style={styles.sign_up_text}>Don't you have an account?</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_LaunchScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  CandY_text: {
    fontSize: 65,
    fontWeight: '700',
    color: '#5B30E6',
    fontFamily: "font-Bold",
  },
  sub_text: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: "font-Bold",
  },
  sign_in_btn: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 120,
    marginVertical: 10,
  },
  sign_in_text: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'500',
    fontFamily: "font-Medium",
  },
  sign_up_text:{
    textDecorationLine: 'underline',
    color: '#6e6e6e', 
    fontFamily: "font-Medium",
  }

});