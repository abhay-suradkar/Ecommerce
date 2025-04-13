import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError('');

      const storedEmail = await AsyncStorage.getItem('userEmail'); // ✅ corrected key name

      if (!storedEmail) {
        setError('No email found. Please login again.');
        return;
      }

      const response = await fetch('https://api-python-3-4pq4.onrender.com/get');
      const data = await response.json();

      if (response.ok) {
        const loggedInUser = data.users.find((user) => user.email === storedEmail);

        if (loggedInUser) {
          setUserData(loggedInUser);
        } else {
          setError('User not found.');
        }
      } else {
        setError(`Failed to fetch user data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C9E6F0" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.userContainer}>
          <Image source={require('../Images/profile.png')} style={styles.user} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          userData && (
            <View style={styles.infoContainer}>
              <Text style={styles.info}>Name: {userData.name}</Text>
              <Text style={styles.info}>Email: {userData.email}</Text>
              <Text style={styles.info}>Number: {userData.mobile}</Text>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('MyAddress')}
              >
                <Text style={styles.button}>My Address</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('MyOrders')}
              >
                <Text style={styles.button}>My Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('Logout')}
              >
                <Text style={styles.button}>Logout</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E6F0',
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 25,
    flex: 1,
    fontWeight: 'bold',
  },
  userContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  user: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  infoContainer: {
    width: '100%',
    marginTop: 30,
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    fontSize: 16,
    backgroundColor: 'lightblue',
    paddingVertical: 12,
    paddingLeft: 10,
    borderRadius: 8,
    textAlign: 'left',
    color: 'black',
    width: '100%',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default Profile;
