import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackIcon from '../assets/arrow.png';
import Run from '../assets/run.png';
import Calender from '../assets/calendar.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DetailScreen = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.id;
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const api = `https://api.tvmaze.com/shows/${id}`;
        const response = await fetch(api);
        const data = await response.json();
        if (response.ok) {
          setShow(data);
        } else {
          console.log('Error Getting the Details');
        }
      } catch (error) {
        console.log('Error While Fetching Data', error);
      }
    };
    fetchDetail();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View
          style={{
            padding: 10,
            // marginHorizontal:171,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BackIcon} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            gap: 21,
            alignItems: 'center',
          }}
        >
          <Pressable onPress={() => navigation.navigate('Search')}>
            <MaterialCommunityIcons
              name="magnify"
              style={{
                color: 'white',
                fontSize: 25,
              }}
            />
          </Pressable>
          <Pressable onPress={() => console.log('Avatar Clicked')}>
            {/* <Image source={User} /> */}
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {show && (
        <View>
          <Image
            source={{ uri: show.image.original }}
            style={styles.showImage}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <Text style={styles.showTitle}>{show.name}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name="star"
                style={{
                  color: 'orange',
                  fontSize: 25,
                  // marginLeft: -41,

                  // height: 30,
                }}
              />
              <Text style={styles.showRating}>({show.rating.average})</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.showStatus}>Status: {show.status}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image source={Calender} />
              <Text style={styles.showPremiered}>{show.premiered}</Text>
            </View>
          </View>



       
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 11,
                marginTop:20,
                paddingHorizontal:10,
              }}
            >
            <View style  = {{
              flexDirection:'row',
              alignItems:'center',
              gap:11,
            }}>
            <MaterialCommunityIcons
                name="clock"
                style={{
                  color: 'orange',
                  fontSize: 25,
                  // marginLeft: -41,

                  // height: 30,
                }}
              />

              <Text style={styles.showRuntime}>{show.runtime} min</Text>


            </View>
              
              <View style={{
                flexDirection:'row',

              }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}
                >
                  Language : {show.language}
                </Text>
              </View>
            </View>
       

          <View style={styles.showGenresContainer}>
            {show.genres.map((genre, index) => (
              <View key={index} style={styles.genreContainer}>
                <Text style={styles.showGenres}>{genre}</Text>
              </View>
            ))}
          </View>
          <Text style  = {{
            color:'white',
            marginTop:20,
            fontSize:21,
            marginBottom:10,
          }}>Summary</Text>

          <Text style={styles.showSummary}>{show.summary}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#141414',
  },
  showImage: {
    // marginTop:90,
    height: 400,
    width: '100%',
    borderRadius: 10,
    marginBottom: 16,
  },
  showTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  showStatus: {
    fontSize: 16,
    // marginBottom: 8,
    color: 'white',
    paddingHorizontal: 10,
  },
  showGenresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 21,
    alignItems: 'center',

    marginTop: 18,
  },
  genreContainer: {
    backgroundColor: 'gray',
    padding: 8,
    marginRight: 8,
    borderRadius: 25,
    paddingHorizontal: 31,
  },
  showGenres: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  showPremiered: {
    fontSize: 16,
    // marginBottom: 8,
    color: 'white',
  },
  showRuntime: {
    // padding: 1,
    fontSize: 16,
    // marginBottom: 8,
    color: 'white',
  },
  showRating: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  showSummary: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    marginBottom: 40,
  },
});

export default DetailScreen;
