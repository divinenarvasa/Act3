import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Switch, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userBio, setUserBio] = useState('This is your bio.');
  const [userProfilePic, setUserProfilePic] = useState('https://example.com/profile-pic.png'); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colorScheme = useColorScheme();

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  useEffect(() => {
    const getUserData = async () => {
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');
      const bio = await AsyncStorage.getItem('bio');
      const profilePic = await AsyncStorage.getItem('profilePic');

      if (name && email) {
        setUserName(name);
        setUserEmail(email);
      }
      if (bio) setUserBio(bio);
      if (profilePic) setUserProfilePic(profilePic);
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('bio');
    await AsyncStorage.removeItem('profilePic');
    navigation.navigate('Login');
  };

  const handleNotificationSettings = () => {
    Alert.alert("Notifications", "Manage your notification preferences here."); 
  };

  const handleChangeLanguage = () => {
    Alert.alert("Change Language", "Language options will be here."); 
  };

  const handleSupport = () => {
    Alert.alert("Support", "Support options will be here."); 
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#088F8F' }]}>
      <Text style={[styles.headerText, { color: isDarkMode ? 'white' : 'black' }]}>Profile</Text>

      <Image source={{ uri: userProfilePic }} style={styles.profilePic} />

      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: isDarkMode ? 'white' : 'black' }]}>Name: {userName}</Text>
        <Text style={[styles.infoText, { color: isDarkMode ? 'white' : 'black' }]}>Email: {userEmail}</Text>
        <Text style={[styles.bioText, { color: isDarkMode ? 'white' : 'black' }]}>Bio: {userBio}</Text>
      </View>

    
      <View style={styles.toggleContainer}>
        <Text style={{ color: isDarkMode ? 'white' : 'black' }}>Dark Mode  </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      
      <TouchableOpacity onPress={handleNotificationSettings} style={styles.optionButton}>
        <Text style={[styles.optionText, { color: isDarkMode ? 'white' : 'black' }]}>Notification Settings</Text>
      </TouchableOpacity>

  
      <View style={styles.accountOptionsBox}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? 'white' : 'black' }]}>Manage Account</Text>
        <TouchableOpacity onPress={() => alert('Change Email')}>
          <Text style={[styles.accountText, { color: isDarkMode ? 'white' : 'black' }]}>Change Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Change Password')}>
          <Text style={[styles.accountText, { color: isDarkMode ? 'white' : 'black' }]}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Delete Account')}>
          <Text style={[styles.accountText, { color: isDarkMode ? 'white' : 'black' }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleChangeLanguage}>
        <Text style={[styles.accountText, { color: isDarkMode ? 'white' : 'black' }]}>Change Language</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSupport}>
        <Text style={[styles.accountText, { color: isDarkMode ? 'white' : 'black' }]}>Support</Text>
      </TouchableOpacity>

    
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    position: 'absolute',
    top: 70,
    right: 10,
    width: 'auto',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  accountOptionsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 18,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 70,
    right: 50,
    width: 'auto',
  },
});
