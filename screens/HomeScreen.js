import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import User from '../assets/user.png';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [shows, setShows] = useState([]);
  const [expandedShows, setExpandedShows] = useState({});

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const api = 'https://api.tvmaze.com/search/shows?q=all';
        const response = await fetch(api);
        const data = await response.json();
        if (response.ok) {
          setShows(data);
        } else {
          console.log('Error Fetching Data');
        }
      } catch (error) {
        console.log('Error Fetching the Data', error);
      }
    };

    fetchShows();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View
          style={
            {
              // marginHorizontal:171,
            }
          }
        >
          <Text
            style={{
              fontSize: 21,
              color: 'red',
              fontWeight:'bold',
              letterSpacing:1,
            }}
          >
            QuadB Tech
          </Text>
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
            <Image source={User} />
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'black',
       
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const toggleShowExpansion = (showId) => {
    setExpandedShows((prevExpandedShows) => ({
      ...prevExpandedShows,
      [showId]: !prevExpandedShows[showId],
    }));
  };

  const renderSummary = (summary, showId) => {
    const maxLength = 150;

    if (summary && summary.length > maxLength) {
      const truncatedSummary = summary.substring(0, maxLength);

      if (expandedShows[showId]) {
        return (
          <View>
            <Text style={styles.showTitle}>{summary}</Text>
            <Pressable onPress={() => toggleShowExpansion(showId)}>
              <Text style={{ color: 'blue' }}>See Less...</Text>
            </Pressable>
          </View>
        );
      }

      return (
        <View>
          <Text style={styles.showTitle}>{truncatedSummary}</Text>
          <Pressable onPress={() => toggleShowExpansion(showId)}>
            <Text style={{ color: 'blue' }}>See More...</Text>
          </Pressable>
        </View>
      );
    }

    return <Text style={styles.showTitle}>{summary}</Text>;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {shows.map((show) => (
        <View key={show.show.id} style={styles.showContainer}>
          <Pressable
            onPress={() => navigation.navigate('Detail', { id: show.show.id })}
          >
            <Image
              source={{ uri: show.show.image?.original }}
              style={styles.showImage}
            />
            <View style = {{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
            <Text style={{
              fontSize:21,
              color:'#fff',
              marginTop:6,
            }}>{show.show.name}</Text>
            <Text style={{
              fontSize:21,
              color:'#fff',
              marginTop:6,
            }}>{show.show.type}</Text>

            </View>
            
            
          </Pressable>
          
          {renderSummary(show.show.summary, show.show.id)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    padding: 10,
  },
  headerLeftContainer: {
    marginLeft: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginRight: 10,
    gap: 21,
  },
  showContainer: {
    marginBottom: 20,
  },
  showImage: {
    height: 390,
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    backgroundColor: '#ddd', // Placeholder background color
  },

  showTitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});

export default HomeScreen;
