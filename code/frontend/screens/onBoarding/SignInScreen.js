import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

// The screen when the user can sign in
export default function SignInScreen({navigation}) {

  // Manage values as states.
  const [id, setId] = useState(""); // Save user's ID
  const [id_warning, setId_warning] = useState(""); // Save warning messages for ID when ID is not valid
  const [password, setPassword] = useState(""); // Save user's password
  const [password_warning, setPassword_warning] = useState("") // Save warning messages for the password when the password is not valid
  const [valid_id, setValid_id] = useState(false); // Save whether ID is valid
  const [valid_password, setValid_password] = useState(false); // Save whether password is valid
  const [validation_mode, setValidation_mode] = useState(false); // Turns to true when the submit button is pressed

  // Set values whenenver the value is typed
  const onChangeId = (val) => setId(val);
  const onChangePassword = (val) => setPassword(val);

  // Set each values null when the cancel button is pressed
  const handleResetId = (val) => onChangeId("");
  const handleResetPassword = (val) => onChangePassword("");

  
  // Show warning messages in dynamic way whenever each fields changes
  useEffect(() => {
    handle_Id_Warning();
  }, [id]);

  useEffect(() => {
    handle_Password_Warning();
  }, [password]);

  // Show warning message when ID is not valid
  const handle_Id_Warning = () => {
    if(id !== ""){
      setId_warning("");
    }
  };

  // Show warning message when password is not valid
  const handle_Password_Warning = () => {
    if(password !== ""){
      setPassword_warning("");
    }
  };

  // Check whether all fields are valid when submit button is pressed
  const validcheck = (id, password) => {
    if(id !== "" && password !== ""){
      // Navigate to the main page
      navigation.navigate('Main');
    }
    if(id === "") { // ID field is empty
      setId_warning("Please enter your ID.");
    }
    if(password === ""){// The password field is empty
      setPassword_warning("Please enter your password.");
    }
  }

  return (
      <View style={styles.container_SignInScreen}>
        <View style={styles.title}>
          <View style={styles.arrow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LaunchScreen')}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.container_title_text}>
            <Text style={styles.title_text}>Sign In</Text>
          </View>
        </View>

        <View style={styles.body}>

          <View style={styles.container_id}>
            <View style={styles.container_text_id}>
              <Text style={styles.text_id}>ID</Text>
              <TextInput 
                onChangeText={onChangeId}
                value={id}
                autoCapitalize='none'
                style={styles.input_id}
              />
            </View>
            <TouchableOpacity
              onPress={(id) => handleResetId(id)}
            >{(id !== "") // If ID is typed, the cancel button shows up
                ? (<MaterialIcons name="cancel" size={20} color="#a4a4a4" />) 
                : null
              }
            </TouchableOpacity>
          </View>
          <Text style={styles.warning}>{id_warning}</Text>


          <View style={{...styles.container_id, marginTop:10}}>
            <View style={styles.container_text_id}>
              <Text style={styles.text_id}>Password</Text>
              <TextInput 
                onChangeText={onChangePassword}
                value={password}
                style={styles.input_id}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={(password) => handleResetPassword(password)}
            >{(password !== "") // If password is typed, the cancel button shows up
                ? (<MaterialIcons name="cancel" size={20} color="#a4a4a4" />) 
                : null
              }
            </TouchableOpacity>
          </View>
          <Text style={styles.warning}>{password_warning}</Text>


        </View>
        <TouchableOpacity 
            style={styles.submit_btn}
            onPress={() => {
              // todo: sending to DB
              validcheck(id, password);
            }}
          >
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container_SignInScreen: {
    flex: 1,
  },
  title: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  arrow: {
    flex: 1,
  },
  container_title_text: {
    flex: 9,
    alignItems: 'center',
    paddingRight: 30,
  },
  title_text: {
    fontSize: 25,
    fontFamily: 'font-SemiBold',
  },
  body: {
    flex: 8,
  },
  container_id: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
  },
  container_text_id: {
    flex: 1,
    marginTop: -10,
  },
  text_id: {
    marginTop: 15,
    flex:1,
    color: '#6e6e6e',
    fontFamily: 'font-Medium',
  },
  input_id:{
    flex: 2,
    width:300, 
    paddingBottom: 10,
  },
  submit_btn: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 50,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  submit_text:{
    color: '#fff',
    fontSize: 20,
    fontFamily: 'font-Medium',    
  },
  warning: {
    color: 'red',
    marginHorizontal: 20,
  }
});