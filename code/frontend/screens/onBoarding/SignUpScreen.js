import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

// The screen when the user can sign up
export default function SignUpScreen({navigation}) {

  // Manage values as states
  const [id, setId] = useState(""); // Save user's ID
  const [id_warning, setId_warning] = useState(""); // Save warning messages for ID when ID is not valid
  const [password, setPassword] = useState(""); // Save user's password
  const [password_warning, setPassword_warning] = useState("") // Save warning messages for the password when the password is not valid
  const [confirm_pw, setConfirm_pw]= useState(""); // Save user's password confirmation
  const [confirm_pw_warning, setConfirm_pw_warning] = useState(""); // Save warning messages for password confirmation when password confirmation is not valid
  const [valid_id, setValid_id] = useState(false); // Save whether ID is valid
  const [valid_password, setValid_password] = useState(false); // Save whether password is valid
  const [valid_confirm_pw, setValid_confirm_pw] = useState(false); // Save whether confirm_pw is valid
  const [validation_mode, setValidation_mode] = useState(false); // Turns to true when the submit button is pressed
  
  // Set values whenenver the value is typed.
  const onChangeId = (val) => setId(val);
  const onChangePassword = (val) => setPassword(val);
  const onChangeConfirm_pw = (val) => setConfirm_pw(val);
  
  // Set each value null when the cancel button is pressed.
  const handleResetId = (val) => onChangeId("");
  const handleResetPassword = (val) => onChangePassword("");
  const handleResetConfirm_pw = (val) => onChangeConfirm_pw("");
  
  // Show warning messages in dynamic way whenever each fields changes.
  useEffect(() => {
    handle_Id_Warning();
  }, [id]);

  useEffect(() => {
    handle_Password_Warning();
  }, [password]);

  useEffect(() => {
    handle_Confirm_pw_Warning();
  }, [confirm_pw]);


  // Show warning messages when ID is not valid.
  const handle_Id_Warning = () => {

    setValidation_mode(false); // The submit button is not pressed

    // When ID is typed
    if(id !== ""){
      
      if((id.length < 4) || id.length > 12) { // When the length of ID is less than 4 or more than 12
        setId_warning("ID must be 4 to 12 characters long.");
        setValid_id(false);
      }else{
        setId_warning("");
        setValid_id(true);
      }

      if(!(/^[A-Za-z0-9][A-Za-z0-9]*$/.test(id))){ // When ID doesn't contain letters and numbers.
        setId_warning("ID must be combination of letters and numbers.");
        setValid_id(false);
      }
      
    }else if(id === "" && validation_mode === false){ // When ID is cleared, the warning message is also cleared.
      setId_warning("");
      setValid_id(false);
    }
  };

  // Show warning message when password is not valid.
  const handle_Password_Warning = () => {

    setValidation_mode(false); // The submit button is not pressed

    // When the password is typed
    if(password !== ""){
      if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))){ // When the length of the password is less than 8 or it doesn't contain a number
        setPassword_warning("Password must be at least 8 characters with 1 number.");
        setValid_password(false);
      }else{
        setPassword_warning("");
        setValid_password(true);
      }
    }else if(password === "" && validation_mode === false){ // When the password is cleared, the warning message is also cleared
      setPassword_warning("");
      setValid_password(false);
    }
  }

  // Show warning message when confirmation password is not valid.
  const handle_Confirm_pw_Warning = () => {

    setValidation_mode(false); // The submit button is not pressed

    if(confirm_pw !== password){ // When the password doesn't match the password confirmation
      setConfirm_pw_warning("Your password and confirmation password must match.");
      setValid_confirm_pw(false);
    }else{ // When the password confirmation is cleared, the warning message is also cleared.
      setConfirm_pw_warning("");
      setValid_confirm_pw(true);
    }
  }

  // Check whether all fields are valid when the submit button is pressed.
  const validcheck = () => {
    setValidation_mode(true);

    if(valid_id && valid_password && valid_confirm_pw){ // All fields are valid
      navigation.navigate('SignInScreen'); // Navigate to the sign in screen
    }
    if(id === "") { // ID field is empty
      setId_warning("Please enter your ID.");
    }
    if(password === ""){ // The password field is empty
      setPassword_warning("Please enter your password.");
    }
    if(confirm_pw === ""){ // The password confirmation field is empty
      setConfirm_pw_warning("Please enter your confirmation password.");
    }
  }

  return (
      <View style={styles.container_SignInScreen}>
        <View style={styles.title}>
          <View style={styles.arrow}>
            <TouchableOpacity
              // Navigate to the launch screen
              onPress={() => navigation.navigate('LaunchScreen')}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.container_title_text}>
            <Text style={styles.title_text}>Sign Up</Text>
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
            >
            {(id !== "") // If ID is typed, the cancel button shows up.
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
                textContentType="oneTimeCode"
              />
            </View>
            <TouchableOpacity
              onPress={(password) => handleResetPassword(password)}
            >
              {(password !== "") // If the password is typed, the cancel button shows up.
                  ? (<MaterialIcons name="cancel" size={20} color="#a4a4a4" />) 
                  : null
              }
            </TouchableOpacity>
          </View>
          <Text style={styles.warning}>{password_warning}</Text>

          <View style={{...styles.container_id, marginTop:10}}>
            <View style={styles.container_text_id}>
              <Text style={styles.text_id}>Confirm password</Text>
              <TextInput 
                onChangeText={onChangeConfirm_pw}
                value={confirm_pw}
                style={styles.input_id} 
                secureTextEntry={true}
                textContentType="oneTimeCode"
              />
            </View>
            <TouchableOpacity
              onPress={(confirm_pw) => handleResetConfirm_pw(confirm_pw)}
            >
              {(confirm_pw !== "") // If the password confirmation is typed, the cancel button shows up.
                  ? (<MaterialIcons name="cancel" size={20} color="#a4a4a4" />) 
                  : null
              }
            </TouchableOpacity>
          </View>
          <Text style={styles.warning}>{confirm_pw_warning}</Text>


        </View>
        <TouchableOpacity 
            style={styles.submit_btn}
            onPress={() => {
              validcheck();
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