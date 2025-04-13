import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Alert } from 'react-native';
import CustomTextinput from '../Common/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../Common/CommonButton';
import { useDispatch } from 'react-redux';
import { addAddress } from '../Redux/actions';
import { ScrollView } from 'react-native-gesture-handler';

const AddAddress = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State variables for input fields
    const [email, setEmail] = useState('');
    const [addressId, setAddressId] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');

    const handleAddAddress = async () => {
        if (!email || !state || !city || !area || !pincode) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        try {
            const response = await fetch('https://api-python-3-4pq4.onrender.com/addAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    state,
                    city,
                    area,
                    zip_code: pincode,
                }),
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (response.ok) {
                Alert.alert('Success', 'Address added successfully!');
                dispatch(addAddress({email, city, state, area, pincode }));
                navigation.goBack();
            } else {
                let errorMessage = data.detail ? JSON.stringify(data.detail, null, 2) : JSON.stringify(data, null, 2);
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert('Error', 'Failed to connect to the server.');
        }
    };

    return (
        <ScrollView style={{flex: 1}}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../Images/back.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.title}>Add Address</Text>
            </View>

            <View style={{ marginTop: 40 }}>
                <CustomTextinput
                    Placeholder="Enter Email"
                    icon={require('../Images/gmail.png')}
                    value={email}
                    onChangeText={setEmail}
                    marginTop={20}
                />
                <CustomTextinput
                    Placeholder="Enter Your State"
                    icon={require('../Images/state.png')}
                    value={state}
                    onChangeText={setState}
                    marginTop={20}
                />
                <CustomTextinput
                    Placeholder="Enter Your City"
                    icon={require('../Images/city.png')}
                    value={city}
                    onChangeText={setCity}
                    marginTop={20}
                />
                <CustomTextinput
                    Placeholder="Enter Your Area"
                    icon={require('../Images/building.png')}
                    value={area}
                    onChangeText={setArea}
                    marginTop={20}
                />
                <CustomTextinput
                    Placeholder="Enter Your PinCode"
                    icon={require('../Images/pincode.png')}
                    value={pincode}
                    keyboardType="number-pad"
                    onChangeText={setPincode}
                    marginTop={20}
                />
                <CommonButton
                    title="Save Address"
                    bgcolor="lightblue"
                    style={styles.button}
                    onPress={handleAddAddress}
                />
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15, // Space between back button and title
    },
    button: {
        marginTop: 30,
    },
});

export default AddAddress;
