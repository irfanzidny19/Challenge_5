import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import React, {useState} from 'react';
import {getName, getRegisterStatus, registerAccount} from '../redux/actions';
import PasswordInputText from 'react-native-hide-show-password-input';
import {TextField} from 'react-native-material-textfield';
import {styles} from '../utils/styles';

export default function Register({navigation}) {
  const [Email, setEmail] = useState('');
  const [Valid, setValid] = useState(true);
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');

  const dispatch = useDispatch();

  const onChangeEmail = value => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false) {
      // console.log('Email is Not Correct');
      setValid(false);
      setEmail(value);
      return false;
    } else {
      setValid(true);
      setEmail(value);
      // console.log('Email is Correct');
      return true;
    }
  };

  const onChangeName = value => {
    setName(value);
  };

  const onChangePassword = value => {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (reg.test(value) === false) {
      console.log('Email is Not Correct');
      setValid(false);
      setPassword(value);
      return false;
    } else {
      setValid(true);
      setPassword(value);
      // console.log('Password is Correct');
      return true;
    }
  };
  const onSend = () => {
    const body = {
      email: Email,
      password: Password,
      name: Name,
    };
    axios
      .post('http://code.aldipee.com/api/v1/auth/register', body)
      .then(resp => {
        // console.log(resp);
        dispatch(getName(Name));
        navigation.navigate('RegisterConfirm');
      })
      .catch(error => {
        Alert.alert('Register Gagal', `${error}`);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.form}>
        <Text style={styles.title}>Register</Text>
        <TextField
          autoCapitalize="words"
          title="Ex: John Doe"
          lineWidth={2}
          labelFontSize={18}
          label="Full Name"
          keyboardType="email-address"
          onChangeText={onChangeName}
        />
        <TextField
          // style={[Valid ? styles.Valid : styles.notValid]}
          title="Must be valid email"
          label="Email"
          lineWidth={2}
          labelFontSize={18}
          tintColor={Valid ? 'rgb(0,145,234)' : 'rgb(255,0,0)'}
          keyboardType="email-address"
          onChangeText={onChangeEmail}
          titleTextStyle={styles.help}
        />
        <TextInput
          onChangeText={onChangePassword}
          placeholder="Password"
          secureTextEntry={true}
          lineWidth={2}
          style={
            //   {
            //   borderBottomColor: 'rgb(0,0,38)',
            //   borderBottomWidth: 1,
            //   marginBottom: 5,
            // },
            Valid
              ? {
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                  marginBottom: 5,
                }
              : {borderWidth: 1, borderColor: 'red', marginBottom: 5}
          }
          labelFontSize={18}
          label="Password"
        />
        {/* <PasswordInputText
          title="password must be at least 8 characters long with 1 uppercase 1 lowercase & 1 numeric character"
          onChangeText={onChangePassword}
          lineWidth={2}
          labelFontSize={18}
          tintColor={Valid ? 'rgb(0,145,234)' : 'rgb(255,0,0)'}
          titleTextStyle={styles.help}
        /> */}
        <Button onPress={onSend} title="register" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          <Text style={{color: 'black'}}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                color: 'rgb(0,145,234)',
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
