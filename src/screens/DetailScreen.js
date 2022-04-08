import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Button,
  Pressable,
} from 'react-native';
import Shares from 'react-native-share';
import {useSelector} from 'react-redux';
import {Back, Like, Share} from '../assets';
import files from '../assets/Base64';
import BuyComponent from '../components/BuyComponent';
import MovieBox from '../components/MovieBox';
import {notifikasi} from '../components/PushNotification';
import {FORMAT_UKURAN, WARNA_SEKUNDER, WARNA_UTAMA} from '../utils/constant';

const DetailScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [Visibility, setVisibility] = useState(true);
  const [DetailBooks, setDetailBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const token = useSelector(state => state.appData.token);

  useEffect(() => {
    wait(1000).then(() => {
      setVisibility(!Visibility);
    });
    movieDetail();
  }, []);

  const movieDetail = async () => {
    try {
      const results = await axios.get(
        `http://code.aldipee.com/api/v1/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // ${token}
        },
      );

      setDetailBooks(results.data);
    } catch (err) {
      Alert.alert('ERROR MESSAGE', `${err}`);
    }
  };

  const notification = () => {
    notifikasi.configure();
    notifikasi.makeChannel('1');
    notifikasi.sendNotification('1', `Saya menyukai ${DetailBooks.title}`);
  };

  // console.log(`${DetailBooks.title}`);
  return (
    <View style={styles.container}>
      {Visibility && (
        <View>
          <ActivityIndicator
            animating={Visibility}
            hidesWhenStopped={Visibility}
            size={100}
          />
        </View>
      )}
      {!Visibility && (
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <ImageBackground
              source={{uri: `${DetailBooks.cover_image}`}}
              style={styles.header}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <Back />
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={notification}>
                    <Like />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const shareOptions = {
                        title: `${DetailBooks.title}`,
                        url: files.image1,
                      };

                      try {
                        Shares.open(shareOptions);
                      } catch (err) {
                        console.log('ERROR:', err);
                      }
                    }}>
                    <Share />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            <MovieBox
              image={DetailBooks.cover_image}
              title={DetailBooks.title}
              author={DetailBooks.author}
              publisher={DetailBooks.publisher}
              average_rating={DetailBooks.average_rating}
            />
            <View>
              <View>
                <Text style={styles.menu}>Synopsis</Text>
                <Text style={styles.sinopsis}>{DetailBooks.synopsis}</Text>
              </View>
            </View>
          </ScrollView>
          <BuyComponent
            title={DetailBooks.title}
            rating={DetailBooks.average_rating}
            sold={DetailBooks.total_sale}
            stock={DetailBooks.stock_available}
          />
        </View>
      )}
    </View>
  );
};

export default DetailScreen;

const screens = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_SEKUNDER,
    justifyContent: 'center',
  },
  header: {
    width: screens.width,
    height: screens.height * 0.25,
    alignItems: 'center',
  },
  menu: {
    color: WARNA_UTAMA,
    paddingLeft: 10,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  sinopsis: {
    color: WARNA_UTAMA,
    fontSize: 20,
    textAlign: 'justify',
    paddingHorizontal: 10,
  },
  poster: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  castname: {
    color: WARNA_UTAMA,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    width: screens.width * 0.95,
  },
});
