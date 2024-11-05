import React, { useState, useEffect } from 'react';
import { View, Alert, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn) {
        navigation.navigate('Profile');
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    const storedPassword = await AsyncStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setEmail('');    
      setPassword('');
      navigation.navigate('Profile');
    } else {
      Alert.alert('Error', 'Invalid email or password');
      setEmail('');      
      setPassword(''); 
    }
  };

  return (
    <ImageBackground 
      source={require('./assets/Green.jpg')} // Ensure the path is correct
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <Button 
          mode="contained" 
          onPress={handleLogin}
          style={styles.loginButton} 
          color="#ffffff"
        >
          Login
        </Button>

        <View style={{ height: 20 }} /> {/* Spacer for 20px between buttons */}
        
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton} 
          color="#000000"
        >
          Register
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Make sure image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay for readability
  },
  input: {
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#6200ee',
  },
  registerButton: {
    backgroundColor: '#03dac6',
  },
});
