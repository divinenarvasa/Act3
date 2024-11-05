import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (name && email && password) {
      await AsyncStorage.setItem('name', name);  
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      alert('User registered successfully');
      navigation.navigate('Login');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>Register</Text>
        <TextInput
          label="Name"  
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
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
          onPress={handleRegister}
          style={styles.registerButton}
        >
          Register
        </Button>
      </View>
    </View>
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
    marginHorizontal: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 30,
    height: 30,  
    paddingVertical: 12,
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
});
