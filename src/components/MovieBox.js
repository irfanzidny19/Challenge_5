import React from 'react';
import {Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import {Rating} from 'react-native-ratings';
import {WARNA_UTAMA, WARNA_SEKUNDER} from '../utils/constant';

function MovieBox({image, title, author, publisher, average_rating}) {
  return (
    <View style={styles.container}>
      <Image source={{uri: `${image}`}} style={styles.poster} />
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <View>
          <Text style={styles.bold}>{title}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.menuTitle}>Author</Text>
          <Text style={styles.menuContent}>{author}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.menuTitle}>Publisher</Text>
          <Text style={styles.menuContent}>{publisher}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.menuTitle}>Rating</Text>
          <View style={styles.rating}>
            <Rating
              ratingCount={10}
              tintColor={WARNA_UTAMA}
              startingValue={average_rating}
              imageSize={20}
              readonly={true}
              style={styles.rating}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default MovieBox;

const screens = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_UTAMA,
    marginHorizontal: screens.width * 0.025,
    borderRadius: 12,
    marginTop: -screens.height * 0.1,
    width: screens.width * 0.95,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
  },
  banner: {
    width: screens.width * 0.9,
    height: 130,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonAksi: {
    paddingTop: 17,
    paddingLeft: 17,
    paddingBottom: 17,
  },
  poster: {
    width: 140,
    height: 180,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  menuTitle: {
    color: WARNA_SEKUNDER,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  menuContent: {
    color: WARNA_SEKUNDER,
  },
  bold: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: WARNA_SEKUNDER,
    fontSize: 25,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
});
