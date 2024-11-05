import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (email && password) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      alert('User registered successfully');
      navigation.navigate('Login');
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        onChangeText={setEmail}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
