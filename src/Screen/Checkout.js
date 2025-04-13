import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CommonButton from '../Common/CommonButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = () => {
    const cartData = useSelector(state => state.cart);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState("");


    useEffect(() => {
        getUserEmail(); // Get email when the component loads
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (userEmail) {
                fetchAddress(userEmail);
            }
        }, [userEmail])
    );

    const getUserEmail = async () => {
        try {
            const email = await AsyncStorage.getItem("userEmail");
            if (email) {
                setUserEmail(email);
                fetchAddress(email);
            } else {
                Alert.alert("Error", "No email found. Please log in again.");
                navigation.navigate("Login");
            }
        } catch (error) {
            console.error("Error fetching email:", error);
        }
    };

    const fetchAddress = async (email) => {
        try {
            setLoading(true);
            console.log("Fetching addresses for:", email);
            const response = await fetch(`https://api-python-3-4pq4.onrender.com/getaddress?email=${encodeURIComponent(email)}`);
            const data = await response.json();
            console.log("Fetched Data:", data);

            if (data.address) {
                setAddresses(data.address);
            } else {
                setAddresses([]);
                console.error("No address data found.");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        } finally {
            setLoading(false);
        }
    };
    const getTotal = () => {
        return cartData.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            setError('Please select an address');
            return;
        }
        setError('');
        navigation.navigate('payment');
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={cartData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                        <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 10 }} />
                        <View style={{ paddingLeft: 15 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ marginTop: 10, fontSize: 16, color: 'green' }}>{'₹' + item.price}</Text>
                            <Text style={{marginTop: 10, fontSize:16, color: 'green'}}>{item.quantity}</Text>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                ListFooterComponent={() => (
                    <View>
                        <View style={{ marginTop: 20, paddingVertical: 10, borderTopWidth: 1, borderColor: '#ccc', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total :</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', position: 'absolute', right: 0, marginTop: 5 }}>{'₹ ' + getTotal()}</Text>
                        </View>

                        {loading && <ActivityIndicator size="large" color="blue" style={{ marginVertical: 10 }} />}

                        {addresses.length === 0 && !loading && (
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 6,
                                        paddingHorizontal: 12,
                                        borderRadius: 20,
                                        borderWidth: 1,
                                    }}
                                    onPress={() => {
                                        navigation.navigate('AddAddress');
                                    }}
                                >
                                    <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold' }}>Add Address</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {!loading && addresses.length > 0 && (
                            <FlatList
                                data={addresses}
                                keyExtractor={(item) => item.address_id.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.addressItem}>
                                        <Text style={styles.addressText}><Text style={styles.bold}>State:</Text> {item.state}</Text>
                                        <Text style={styles.addressText}><Text style={styles.bold}>City:</Text> {item.city}</Text>
                                        <Text style={styles.addressText}><Text style={styles.bold}>Area:</Text> {item.area}</Text>
                                        <Text style={styles.addressText}><Text style={styles.bold}>Pincode:</Text> {item.zip_code}</Text>
                                        <TouchableOpacity
                                            style={{ marginTop: 10, backgroundColor: selectedAddress === item ? 'blue' : 'red', padding: 8, borderRadius: 5 }}
                                            onPress={() => {
                                                setSelectedAddress(item);
                                                setError('');
                                            }}
                                        >
                                            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{selectedAddress === item ? 'Selected' : 'Select'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        )}
                        <View style={{ marginTop: 20, padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, backgroundColor: '#f8f8f8' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 5 }}>Selected Address</Text>
                            {selectedAddress ? (
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'center', fontWeight: '500' }}>
                                    {`City: ${selectedAddress.city}, Area: ${selectedAddress.area}, Pincode: ${selectedAddress.zip_code}`}
                                </Text>
                            ) : (
                                <Text style={{ fontSize: 16, color: '#888', textAlign: 'center', fontWeight: '500' }}>
                                    Please Select an Address
                                </Text>
                            )}
                        </View>

                        {error ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text> : null}

                        <CommonButton
                            bgcolor={selectedAddress ? 'lightblue' : 'gray'}
                            textcolor={'black'}
                            title={'Place Order'}
                            onPress={handlePlaceOrder}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    addressItem: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "white",
        elevation: 3,
    },
    addressText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#333",
    },
    bold: {
        fontWeight: "bold",
    },
})
export default Checkout;
