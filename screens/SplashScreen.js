
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Logo from '../assets/splash.png';


const SplashScreen = ({ navigation }) => {
 
  useEffect(() => {
    const timer = setTimeout(() => {
     
      navigation.replace('Home');
    }, 3000); 

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

 
  return (
    <View style={styles.container}>
    
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain', 
  },
});


export default SplashScreen;
