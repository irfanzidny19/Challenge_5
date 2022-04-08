import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Rating} from 'react-native-ratings';
import {WARNA_SEKUNDER, WARNA_UTAMA, FORMAT_UKURAN} from '../utils/constant';
import {notifikasi} from '../components/PushNotification';

export default function BuyComponent({title, rating, sold, stock}) {
  const notification = () => {
    notifikasi.configure();
    notifikasi.makeChannel('1');
    notifikasi.sendNotification('1', `Saya membeli ${title}`);
  };

  return (
    <View style={styles.price}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={[styles.menuTitle, styles.rating]}>{rating} </Text>
        <Rating
          ratingCount={1}
          tintColor={WARNA_UTAMA}
          startingValue={5}
          imageSize={30}
          readonly={true}
          style={{marginLeft: -10}}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.menuContent}>{sold}</Text>
        <Text style={styles.menuTitle}>Sold</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.menuTitle}>Stock</Text>
        <Text style={styles.menuContent}>{stock}</Text>
      </View>
      <Pressable
        onPress={notification}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#fff' : '#03ac0e',
          },
          styles.pressable,
        ]}>
        {({pressed}) => (
          <Text
            style={[
              {
                color: pressed ? '#03ac0e' : '#fff',
                fontWeight: pressed ? 'bold' : 'normal',
              },
              styles.buttonText,
            ]}>
            {pressed ? 'Thankss!' : 'Buy Now'}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const screens = Dimensions.get('screen');

const styles = StyleSheet.create({
  price: {
    bottom: 3,
    width: screens.width * 0.95,
    marginHorizontal: screens.width * 0.025,
    backgroundColor: WARNA_UTAMA,
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  pressable: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: FORMAT_UKURAN,
  },
  menuContent: {
    color: WARNA_SEKUNDER,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: FORMAT_UKURAN,
  },
  menuTitle: {
    color: WARNA_SEKUNDER,
    fontSize: FORMAT_UKURAN,
  },
  rating: {
    fontSize: FORMAT_UKURAN + 8,
  },
});
