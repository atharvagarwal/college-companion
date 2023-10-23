import React, { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './components/TabNav';
import JobDetails from './pages/JobDetails';
import Jobs from './pages/Jobs';
import JobRegister from './pages/JobRegister';
const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Login">
        <Stack.Screen  options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Dashboard" component={TabNav} />
        <Stack.Screen options={{ headerShown: false }} name="JobDetails" component={JobDetails} />
        <Stack.Screen options={{ headerShown: false }} name="Jobs" component={Jobs} />
        <Stack.Screen options={{ headerShown: false }} name="JobRegister" component={JobRegister} />

      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App