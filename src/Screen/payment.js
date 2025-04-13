import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [success, setSuccess] = useState(false);
    const [buyerName, setBuyerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const name = await AsyncStorage.getItem("userName");
                const mobile = await AsyncStorage.getItem("userMobile");
                const emailVal = await AsyncStorage.getItem("userEmail");
                const total = await AsyncStorage.getItem("orderTotal");

                if (name) setBuyerName(name);
                if (mobile) setPhone(mobile);
                if (emailVal) setEmail(emailVal);
                if (total) setAmount(total);
            } catch (error) {
                console.log("Error fetching user data from AsyncStorage", error);
            }
        };

        getUserData();
    }, []);

    const handleOnlinePayment = () => {
        const url = `https://www.instamojo.com/@abhaysuradkar8?buyer_name=${encodeURIComponent(
            buyerName
        )}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(
            phone
        )}&amount=${amount}&data_readonly=email,phone`;

        Linking.openURL(url);
    };

    const handleProceed = () => {
        if (selectedMethod === "cod") {
            setSuccess(true);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigation.navigate("Home");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <View style={styles.container}>
            {success ? (
                <View style={styles.successContainer}>
                    <Image
                        source={require("../Images/check.png")}
                        style={styles.successImage}
                    />
                    <Text style={styles.successText}>Order Successful!</Text>
                </View>
            ) : (
                <>
                    <Text style={styles.header}>Select Payment Method</Text>

                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedMethod === "cod" && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedMethod("cod")}
                    >
                        <Ionicons
                            name={
                                selectedMethod === "cod"
                                    ? "radio-button-on"
                                    : "radio-button-off"
                            }
                            size={24}
                            color={selectedMethod === "cod" ? "#007bff" : "#888"}
                        />
                        <Text style={styles.optionText}>Cash on Delivery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedMethod === "online" && styles.selectedOption,
                        ]}
                        onPress={() => {
                            setSelectedMethod("online");
                            handleOnlinePayment();
                        }}
                    >
                        <Ionicons
                            name={
                                selectedMethod === "online"
                                    ? "radio-button-on"
                                    : "radio-button-off"
                            }
                            size={24}
                            color={selectedMethod === "online" ? "#007bff" : "#888"}
                        />
                        <Text style={styles.optionText}>Online Payment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedMethod ? styles.buttonActive : styles.buttonDisabled,
                        ]}
                        disabled={!selectedMethod}
                        onPress={handleProceed}
                    >
                        <Text style={styles.buttonText}>Proceed</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
    },
    selectedOption: {
        borderColor: "#007bff",
        borderWidth: 2,
    },
    optionText: {
        fontSize: 18,
        marginLeft: 15,
        fontWeight: "500",
    },
    button: {
        marginTop: 30,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
    },
    buttonActive: {
        backgroundColor: "#007bff",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    successContainer: {
        alignItems: "center",
    },
    successImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    successText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#28a745",
    },
});

export default Payment;
