/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';

const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 3000);
    }, );

    const getData = async () => {
        const email = await AsyncStorage.getItem('Email');
        if (email !== null) {
            navigation.navigate('Home');
        }
        else {
            navigation.navigate('Login');
        }
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C4D9FF' }}>
            <Image
                source={require('../Images/ECommerce1.jpg')}
                style={{ height: 300, width: 300, borderRadius: 150 }}
            />
        </View>
    );
};

export default Splash;
