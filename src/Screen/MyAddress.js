import React, { useState, useCallback, useEffect } from "react";
import { 
    View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert 
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyAddress = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const deleteAddress = async (addressId) => {
        try {
            const response = await fetch(`https://api-python-1-agsg.onrender.com/deleteaddress/${addressId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
    
            const result = await response.json();
            if (result.success) {
                Alert.alert("Success", "Address deleted successfully.");
                fetchAddress(userEmail); // Refresh after deletion
            } else {
                Alert.alert("Error", result.message || "Failed to delete address");
            }
        } catch (error) {
            console.error("Error deleting address:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Addresses</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AddAddress")}> 
                    <Text style={styles.subtitle}>+ Add Address</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : addresses.length > 0 ? (
                <FlatList
                    data={addresses}
                    keyExtractor={(item) => item.address_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.addressItem}>
                            <Text style={styles.addressText}><Text style={styles.bold}>State:</Text> {item.state}</Text>
                            <Text style={styles.addressText}><Text style={styles.bold}>City:</Text> {item.city}</Text>
                            <Text style={styles.addressText}><Text style={styles.bold}>Area:</Text> {item.area}</Text>
                            <Text style={styles.addressText}><Text style={styles.bold}>Pincode:</Text> {item.zip_code}</Text>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAddress(item.address_id)}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noAddress}>No addresses available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    subtitle: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        padding: 7,
        fontSize: 12,
    },
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
    deleteButton: {
        marginTop: 10,
        backgroundColor: "red",
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    noAddress: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
        marginTop: 20,
    },
});

export default MyAddress;
