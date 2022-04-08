import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {styles} from '../utils/styles';

export default function RegisterConfirm({navigation}) {
  const [timerCount, setTimer] = useState(3);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [navigation]);

  if (timerCount === 0) {
    navigation.navigate('Login');
  }

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <Text style={[styles.title, {marginVertical: 20}]}>
        Registration Success
      </Text>
      <Image
        source={require('../assets/check.png')}
        style={{
          width: 300,
          height: 300,
          alignSelf: 'center',
          resizeMode: 'contain',
        }}
      />
      <Text style={[styles.title, {marginVertical: 20}]}>
        We already sent email verification to you
      </Text>
      <Text style={[styles.title, {position: 'absolute', bottom: 50}]}>
        Redirecting in <Text>{timerCount}</Text> Seconds
      </Text>
    </View>
  );
}
