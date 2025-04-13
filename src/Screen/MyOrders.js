import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchUserEmailAndOrders = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                if (!email) {
                    console.log('No email found in AsyncStorage');
                    setLoading(false);
                    return;
                }

                setUserEmail(email);
                fetchOrders(email);
            } catch (error) {
                console.error('Error fetching email:', error);
                setLoading(false);
            }
        };

        fetchUserEmailAndOrders();
    }, []);

    const fetchOrders = async (email) => {
        try {
            setLoading(true);

            const response = await fetch(
                `https://api-python-3-4pq4.onrender.com/get_orderItem1?email=${encodeURIComponent(email)}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();

            if (data.order_item && data.order_item.length > 0) {
                setOrders(data.order_item);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            Alert.alert('Error', 'Something went wrong while fetching orders.');
        } finally {
            setLoading(false);
        }
    };

    const renderOrderCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.orderId}>Order ID: {item.order_item_id}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Products:</Text>
                {item.product_name.map((name, index) => (
                    <View key={index} style={styles.productRow}>
                        <Text style={styles.productName}>{name}</Text>
                        <Text style={styles.productDetail}>Qty: {item.quantity[index]}</Text>
                        <Text style={styles.productDetail}>₹{item.price[index]}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.totalPrice}>Total Price: ₹{item.total_price}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 10 }}>Loading orders...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Orders</Text>

            {orders.length === 0 ? (
                <Text style={styles.noOrderText}>No orders found for {userEmail}</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.order_item_id}
                    renderItem={renderOrderCard}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrderText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 50,
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 10,
        padding: 16,
        borderRadius: 12,
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowOpacity: 0.1, // iOS shadow
        shadowRadius: 5, // iOS shadow
    },
    orderId: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    section: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    productName: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    productDetail: {
        fontSize: 13,
        color: '#666',
        marginLeft: 10,
    },
    footer: {
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'right',
    },
});

export default MyOrders;
