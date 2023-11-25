import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SearchScreen from './screens/SearchScreen';
import SplashScreen from './screens/SplashScreen'; // Import your Splash Screen component

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='Home'
        options={{
          headerLeft: () => null,
        }}
        component={HomeScreen}
      />
      <HomeStack.Screen
        screenOptions={{
          headerShown: false,
        }}
        name='Detail'
        component={DetailScreen}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate some asynchronous initialization (e.g., loading assets, checking auth)
    const initializeApp = async () => {
      // Perform any necessary initialization here

      // Simulate a delay (you can replace this with your actual initialization logic)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mark the app as ready
      setAppReady(true);
    };

    initializeApp();
  }, []);

  if (!isAppReady) {
    // Render the splash screen while the app is initializing
    return <SplashScreen />;
  }

  // Render the main content once the app is ready
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        initialRouteName='home'
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name='home'
          component={HomeStackScreen}
          screenOptions={{}}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View style={styles.tabIconContainer}>
                <MaterialCommunityIcons name='home' color={color} size={size} />
                <Text style={styles.tabIconLabel}>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View style={styles.tabIconContainer}>
                <MaterialCommunityIcons name='magnify' color={color} size={size} />
                <Text style={styles.tabIconLabel}>Search</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});
