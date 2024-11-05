import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreLogs(['Warning: ...']);
console.log("Login Component Loading...");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      console.log("isLoggedIn:", isLoggedIn);
      if (isLoggedIn === 'true') {
        navigation.navigate('Profile');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    const storedPassword = await AsyncStorage.getItem('password');

    console.log("Stored email:", storedEmail, "Entered email:", email);
    console.log("Stored password:", storedPassword, "Entered password:", password);

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Login</Text>
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
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </View>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
          >
            Login
          </Button>
          <View style={{ height: 20 }} />
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
          >
            Register
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#088F8F',
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 20,
    backgroundColor: '#005249',
    marginHorizontal: 30,
    borderRadius: 10,
  },
  input: {
    marginBottom: 30,
    height: 30,
    paddingVertical: 12,
  },
  loginButton: {
    backgroundColor: '#088F8F',
    borderRadius: 0,
  },
  registerButton: {
    backgroundColor: '#088F8F',
    borderRadius: 0,
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 16,
  },
});
