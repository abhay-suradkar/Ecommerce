import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CartItem from '../Common/CartItem';
import { addToWishlist, removeFromCart } from '../Redux/actions';

const CartScreen = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  // ✅ Fetch email from AsyncStorage when screen loads
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail !== null) {
          setEmail(storedEmail);
          console.log('Fetched email:', storedEmail);
        } else {
          console.log('No email found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail();
  }, []);

  // ✅ Place Order Function
  const placeOrder = async () => {
    if (!email) {
      Alert.alert('Error', 'User email not found.');
      return;
    }
  
    if (cartData.length === 0) {
      Alert.alert('Error', 'Your cart is empty.');
      return;
    }
  
    // Debug cartData first!
    console.log('🛒 cartData:', JSON.stringify(cartData, null, 2));
  
    const products = cartData.map((item, index) => {
      const productId = item.product_id || item.id || index + 1;
  
      return {
        product_id: productId,
        product_name: item.name || 'Unknown Product',
        quantity: item.quantity || 1,
        price: item.price || 0,
      };
    });
  
    const requestBody = {
      email: email,
      products: products,
    };
  
    console.log('🚀 Sending Order:', JSON.stringify(requestBody, null, 2));
  
    try {
      const response = await fetch('https://api-python-3-4pq4.onrender.com/add_order_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const result = await response.json();
      console.log('📩 API Response:', JSON.stringify(result, null, 2));
  
      if (response.ok) {
        Alert.alert('Success', 'Order placed successfully!');
        navigation.navigate('Checkout');
      } else {
        console.log('❌ Response not OK:', JSON.stringify(result));
        Alert.alert('Error', result.detail || 'Failed to place order.');
      }
    } catch (error) {
      console.error('❌ Error placing order:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C9E6F0" barStyle="dark-content" />

      <View style={styles.appBar}>
        <Text style={styles.title}>Cart List</Text>
      </View>

      {cartData.length > 0 ? (
        <FlatList
          data={cartData}
          renderItem={({ item, index }) => (
            <CartItem
              item={item}
              onAddWishlist={() => dispatch(addToWishlist(item))}
              onRemoveItem={() => dispatch(removeFromCart(index))}
            />
          )}
          keyExtractor={(item) => (item.product_id || item.id || index).toString()}
          style={{ marginTop: 10 }}
        />
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>No Item Added In The Cart</Text>
        </View>
      )}

      {cartData.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={placeOrder}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E6F0',
  },
  appBar: {
    height: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#C9E6F0',
    marginLeft: 30,
    marginTop: 10,
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: 'black',
  },
  checkoutContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  checkoutButton: {
    width: '90%',
    backgroundColor: '#78B3CE',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 50,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CartScreen;
