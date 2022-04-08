import {StyleSheet, Dimensions} from 'react-native';
import {WARNA_UTAMA, WARNA_SEKUNDER, FORMAT_UKURAN} from './constant';

const screens = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: WARNA_UTAMA,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
    marginTop: -screens.height * 0.08,
    width: screens.width * 0.9,
    backgroundColor: '#fff',
    padding: screens.width * 0.05,
  },
  help: {
    lineHeight: 20,
    fontSize: 15,
  },
  notValid: {
    borderColor: 'red',
    borderWidth: 5,
  },
  Valid: {
    borderColor: 'transparent',
    borderWidth: 5,
  },
  title: {
    alignSelf: 'center',
    fontSize: FORMAT_UKURAN,
    fontWeight: 'bold',
    color: 'black',
  },
  logo: {
    width: 300,
    height: 300,
  },
});
