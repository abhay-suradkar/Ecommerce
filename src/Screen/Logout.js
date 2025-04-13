import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();

      Alert.alert(
        'Logged Out',
        '🔒 You have been logged out successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'), // go to Login screen
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // go back to previous screen
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/logout.png')} // 👈 Add a suitable image here
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Logout</Text>
      <Text style={styles.subtitle}>Are you sure you want to logout?</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Yes, Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
});
