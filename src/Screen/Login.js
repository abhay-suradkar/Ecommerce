/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonButton from '../Common/CommonButton';
import CustomTextinput from '../Common/CustomTextInput';
import Loder from '../Common/Loder';

const Login = () => {
    const navigation = useNavigation();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [Bademail, setBademail] = useState(false);
    const [Badpassword, setBadpassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
            navigation.replace('Home');
        } else {
            setLoading(false);
        }
    };

    const login = async () => {
        setBademail(email === '');
        setBadpassword(password === '');

        if (email !== '' && password !== '') {
            setModalVisible(true);
            try {
                const response = await fetch('https://api-python-3-4pq4.onrender.com/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const text = await response.text(); // Read as text for debugging
                console.log('Raw response:', text);

                let data;
                try {
                    data = JSON.parse(text);
                } catch (parseError) {
                    console.log('JSON parse error:', parseError);
                    Alert.alert('Error', 'Invalid server response');
                    setModalVisible(false);
                    return;
                }

                setModalVisible(false);

                if (response.ok) {
                    console.log('Login Success:', data.Message);

                    // Save tokens and email
                    await AsyncStorage.setItem('accessToken', data.access_token);
                    await AsyncStorage.setItem('refreshToken', data.refresh_token);
                    await AsyncStorage.setItem('userEmail', email); // Using entered email

                    navigation.replace('Home');
                } else {
                    Alert.alert('Login Failed', data.detail || 'Invalid credentials');
                }
            } catch (error) {
                setModalVisible(false);
                console.log('Login API error:', error);
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <Image
                    source={require('../Images/ecommerce.png')}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        alignSelf: 'center',
                        marginTop: '15%',
                    }}
                />
                <Text
                    style={{
                        fontSize: 30,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        marginTop: 30,
                    }}>
                    Login
                </Text>
                <CustomTextinput
                    Placeholder="Enter Email ID"
                    icon={require('../Images/gmail.png')}
                    marginTop={60}
                    value={email}
                    onChangeText={setemail}
                />
                {Bademail && <Text style={{ color: 'red' }}>Please Enter Email</Text>}
                <CustomTextinput
                    type="password"
                    Placeholder="Enter Password"
                    icon={require('../Images/password.png')}
                    marginTop={20}
                    value={password}
                    onChangeText={setpassword}
                />
                {Badpassword && <Text style={{ color: 'red' }}>Please Enter Password</Text>}
                <CommonButton
                    title={'Login'}
                    bgcolor={'lightblue'}
                    textcolor={'black'}
                    onPress={login}
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 20,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                        marginBottom: '10%',
                    }}
                    onPress={() => navigation.navigate('Signup')}>
                    Create New Account?
                </Text>
            </View>
            <Loder modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </ScrollView>
    );
};

export default Login;
