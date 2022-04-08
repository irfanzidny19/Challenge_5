import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getBooks, getLatestBooks} from '../redux/actions';
import {WARNA_SEKUNDER, WARNA_UTAMA, FORMAT_UKURAN} from '../utils/constant';
import {Rating} from 'react-native-ratings';

const Home = ({navigation}) => {
  const [Visibility, setVisibility] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  dispatch(getBooks(token));
  dispatch(getLatestBooks(token));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      dispatch(getBooks(token));
      dispatch(getLatestBooks(token));
    });
  }, []);

  const books = useSelector(state => state.appData.books)?.sort((min, max) => {
    return max.average_rating - min.average_rating;
  });
  const latestBooks = useSelector(state => state.appData.latestBooks);

  const fullName = useSelector(state => state.appData.name);

  const token = useSelector(state => state.appData.token);

  // console.log(books);

  useEffect(() => {
    wait(1000).then(() => {
      setVisibility(!Visibility);

      dispatch(getBooks(token));
      dispatch(getLatestBooks(token));
    });
  }, [token]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.menu}>
              Hello,{' '}
              {Visibility && (
                <ActivityIndicator
                  animating={Visibility}
                  hidesWhenStopped={Visibility}
                />
              )}
              {!Visibility && <Text style={styles.menu}>{fullName}</Text>}
            </Text>

            <Pressable
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'red' : WARNA_UTAMA,
                },
                {
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                },
              ]}>
              {({pressed}) => (
                <Text
                  style={[
                    {
                      color: pressed ? '#fff' : '#fff',
                      fontWeight: pressed ? 'bold' : 'bold',
                    },
                    {
                      fontSize: FORMAT_UKURAN,
                    },
                  ]}>
                  {pressed ? 'Exit' : 'Logout'}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
        <Text style={styles.menu}>Recommended</Text>
        <View>
          {Visibility && (
            <ActivityIndicator
              animating={Visibility}
              hidesWhenStopped={Visibility}
            />
          )}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {books?.map(item => {
              return (
                <View style={{marginHorizontal: 5}}>
                  {!Visibility && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('DetailScreen', {
                          id: `${item.id}`,
                        });
                      }}>
                      <Image
                        style={styles.recommend}
                        source={{
                          uri: `${item.cover_image}`,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Text style={styles.menu}>Latest Upload</Text>
        {Visibility && (
          <ActivityIndicator
            animating={Visibility}
            hidesWhenStopped={Visibility}
          />
        )}
        <View style={{flex: 1}}>
          {latestBooks?.map(item => {
            return (
              <View>
                {!Visibility && (
                  <View style={styles.content}>
                    <Image
                      style={styles.latestUpload}
                      source={{
                        uri: `${item.cover_image}`,
                      }}
                    />
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.title2}>Author</Text>
                        <Text style={styles.detail}>{item.author}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.title2}>Publisher</Text>
                        <Text style={styles.detail}>{item.publisher}</Text>
                      </View>
                      <Rating
                        ratingCount={10}
                        tintColor={WARNA_UTAMA}
                        startingValue={item.average_rating}
                        imageSize={20}
                        readonly={true}
                        style={styles.rating}
                      />
                      <Text style={styles.detail}>
                        <Text style={{fontWeight: 'bold'}}>Rp </Text>
                        {item.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                      <View style={{paddingLeft: 10}}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            navigation.navigate('DetailScreen', {
                              id: `${item.id}`,
                            });
                          }}>
                          <Text
                            style={{color: WARNA_UTAMA, fontWeight: 'bold'}}>
                            Show More
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WARNA_UTAMA,
    padding: 10,
  },
  title: {
    color: WARNA_SEKUNDER,
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    flex: 1,
  },
  menu: {
    color: WARNA_SEKUNDER,
    paddingLeft: 10,
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  title2: {
    color: WARNA_SEKUNDER,
    paddingLeft: 10,
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: '900',
  },
  detail: {
    color: WARNA_SEKUNDER,
    paddingLeft: 10,
    fontSize: 16,
    paddingBottom: 5,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
  recommend: {
    width: 180,
    height: 200,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  latestUpload: {
    width: 140,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: WARNA_SEKUNDER,
    borderRadius: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
});
