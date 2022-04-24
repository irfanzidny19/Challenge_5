import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import {TextField} from 'react-native-material-textfield';
import {useDispatch} from 'react-redux';
import {getName, getToken} from '../redux/actions';
import {styles} from '../utils/styles';
// import Video from 'react-native-video';

const Login = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Valid, setValid] = useState(true);
  const [Password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChangeEmail = value => {
    setEmail(value);
  };
  const onChangePassword = value => {
    setPassword(value);
  };
  const onSend = () => {
    const body = {
      email: Email,
      password: Password,
    };

    axios
      .post('http://code.aldipee.com/api/v1/auth/login', body)
      .then(resp => {
        navigation.navigate('Home');
        dispatch(getName(resp.data.user.name));
        // dispatch(getToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjQ1YmI3OTJjNGViZTBmMWQzMTk5MTQiLCJpYXQiOjE2NDkzNDgwMTIsImV4cCI6MTY0OTM0OTgxMiwidHlwZSI6ImFjY2VzcyJ9.JdPkv9zVNY6TSwGR6RG3ycdxylfyI8-08sm20QUcrB4`));
        dispatch(getToken(resp.data.tokens.access.token));
        // console.log('Login', `${resp.data.tokens.access.token}`);
      })
      .catch(error => {
        // const error_code = error.data.error_code;
        // const message = error.data.message;
        // Alert.alert(`${error_code}`, `${message}`);
        console.log(error);
        Alert.alert('Error', `${error}`);
      });
  };

  return (
    <View style={styles.container} testID="loginview">
       {/* <Video 
                     source={{uri : 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                     style={{
                         width : 600,
                         height : 300
                     }}
             /> */}

      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextField
          title="Ex: dummail@gmail.com"
          label="Email"
          lineWidth={2}
          clearTextOnFocus={true}
          labelFontSize={18}
          keyboardType="email-address"
          onChangeText={onChangeEmail}
        />
        <TextInput
          onChangeText={onChangePassword}
          placeholder="Password"
          secureTextEntry={true}
          lineWidth={2}
          style={{
            borderBottomColor: 'rgb(0,0,38)',
            borderBottomWidth: 1,
            marginBottom: 5,
          }}
          labelFontSize={18}
          label="Password"
        />
        {/* <PasswordInputText
          onChangeText={onChangePassword}
          lineWidth={2}
          labelFontSize={18}
          label="Password"
        /> */}
        
        <Button onPress={onSend} title="login" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          <Text style={{color: 'black'}}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text
              style={{
                color: 'rgb(0,145,234)',
                textDecorationLine: 'underline',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Login;
