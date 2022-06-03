import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {WARNA_SEKUNDER, WARNA_UTAMA} from '../utils/constant';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text></Text>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.name}>Books Store</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_UTAMA,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    color: WARNA_SEKUNDER,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
