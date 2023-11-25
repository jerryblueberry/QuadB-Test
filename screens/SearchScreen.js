import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import { useNavigation } from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const debouncedSearch = _debounce(fetchData, 200); // Adjust the debounce delay as needed

  useEffect(() => {
    if (query.trim() !== '') {
      setLoading(true);
      debouncedSearch(query);
    } else {
      setLoading(false);
      setResults([]); // Clear the results when the search bar is empty
    }
  }, [query]);

  async function fetchData(query) {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
    <View style = {styles.searchBar}>
    <TextInput
        style={styles.input}
        placeholder="Search Movie"
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholderTextColor="white"
      />

      <MaterialCommunityIcons
        name="magnify"
        style={{
          color: 'white',
          fontSize: 20,
          marginLeft:-41,
          height:30,
        }}
      />

    </View>
     

      {/* <Button title="Search" onPress={() => debouncedSearch(query)} /> */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : null}
      {query.trim() !== '' && !loading ? (
        <ScrollView showsVerticalScrollIndicator = {false}>
          {results.map((result) => (
            <View key = {result.show.id}>
            <Pressable
              key={result.show.id}
              style={styles.resultItem}
              onPress={() =>
                navigation.navigate('Detail', { id: result.show.id })
              }
            >
              <Image
                source={{ uri: result.show.image?.original }}
                style={styles.resultImage}
              />
              <Text style={styles.resultName}>{result.show.name}</Text>
              
              
            </Pressable>

            </View>
          
            
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // alignItems:'center',
    marginTop: 40,
    backgroundColor:'#141414'
  },
  searchBar:{
    width:220,
    marginHorizontal:40,
   
    // padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
    

  },
  input: {
    width:300,
    height:40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    color:'white',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:'white',
  },
  resultImage: {
    width: 100,
    height: 90,
  
    resizeMode:'contain'
  },
  resultName:{
    color:'white',
  },
  resultType:{
    color:'white',
  },
  loadingIndicator: {
    marginTop: 10,
  },
});

export default SearchScreen;
