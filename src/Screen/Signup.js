/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonButton from '../Common/CommonButton';
import CustomTextinput from '../Common/CustomTextInput';

const Signup = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        let valid = true;
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Please enter your name.';
            valid = false;
        }
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            valid = false;
        }
        if (!number.trim() || number.length !== 10 || !/^\d+$/.test(number)) {
            newErrors.number = 'Please enter a valid 10-digit mobile number.';
            valid = false;
        }
        if (!password.trim() || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
            valid = false;
        }
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password.';
            valid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const saveData = async () => {
        try {
            const response = await fetch('https://api-python-1-agsg.onrender.com/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mobile: number,
                    password: password,
                    confirm_password: confirmPassword,
                }),
            });
    
            const data = await response.json();
            console.log('API Response:', data);  // 🔍 Log response for debugging
    
            if (response.ok) {
                Alert.alert('Success', 'Account created successfully!');
                navigation.goBack();
            } else {
                let errorMessage = 'Signup Failed';
    
                if (data.detail) {
                    errorMessage = JSON.stringify(data.detail, null, 2);
                } else {
                    errorMessage = JSON.stringify(data, null, 2);
                }
    
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            console.error('Fetch error:', error);  // Log fetch error
            Alert.alert('Error', 'Failed to connect to the server.');
        }
    };
    
        

    const handleSignup = () => {
        if (validateInputs()) {
            saveData();
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                {/* App Logo */}
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
                    Create New Account
                </Text>
                <CustomTextinput
                    Placeholder="Enter Name"
                    icon={require('../Images/user.png')}
                    marginTop={60}
                    value={name}
                    onChangeText={setName}
                />
                {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

                <CustomTextinput
                    Placeholder="Enter Email ID"
                    icon={require('../Images/gmail.png')}
                    marginTop={20}
                    value={email}
                    onChangeText={setEmail}
                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

                <CustomTextinput
                    Placeholder="Enter Mobile Number"
                    icon={require('../Images/call.png')}
                    marginTop={20}
                    value={number}
                    keyboardType="number-pad"
                    onChangeText={setNumber}
                />
                {errors.number && <Text style={{ color: 'red' }}>{errors.number}</Text>}

                <CustomTextinput
                    type="password"
                    Placeholder="Enter Password"
                    icon={require('../Images/password.png')}
                    marginTop={20}
                    value={password}
                    onChangeText={setPassword}
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

                <CustomTextinput
                    type="password"
                    Placeholder="Confirm Password"
                    icon={require('../Images/password.png')}
                    marginTop={20}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                {errors.confirmPassword && (
                    <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                )}

                <CommonButton
                    title="Sign Up"
                    bgcolor="lightblue"
                    textcolor="black"
                    onPress={handleSignup}
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 20,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                        marginBottom: '10%',
                    }}
                    onPress={() => navigation.goBack()}>
                    Already Have an Account?
                </Text>
            </View>
        </ScrollView>
    );
};

export default Signup;
