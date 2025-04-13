import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { products } from '../product2';
import { useDispatch } from 'react-redux';
import { addToCart, addToWishlist } from '../Redux/actions';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allProducts = products.category.flatMap(category => category.data);
    setShuffledProducts([...allProducts].sort(() => Math.random() - 0.5));

    // Show loading indicator for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Function to handle adding to cart
  const onAddToCart = (item) => {
    dispatch(addToCart(item)); // Dispatch add to cart action
  };

  // Function to handle adding to wishlist
  const onAddWishlist = (item) => {
    dispatch(addToWishlist(item)); // Dispatch add to wishlist action
  };

  const filteredProducts = shuffledProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C9E6F0" barStyle="light-content" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={'black'}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }} />
      ) : (
        
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 50 }}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />

              <View style={styles.productInfoContainer}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                </View>

                <TouchableOpacity style={styles.cartButton} onPress={() => onAddToCart(item)}>
                  <Text style={styles.cartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.wishlistButton} onPress={() => onAddWishlist(item)}>
                <Image source={require('../Images/heart.png')} style={styles.heartIcon} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#C9E6F0' },
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#C9E6F0',
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
  },
  productCard: {
    flex: 1,
    backgroundColor: '#C9E6F0',
    borderRadius: 15,
    margin: 8,
    paddingBottom: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 13,
    color: 'black',
    marginTop: 4,
  },
  cartButton: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black'
  },
  cartButtonText: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 4,
  },
  heartIcon: {
    width: 25,
    height: 25,
    tintColor: 'gray',
  },
});

export default ProductListScreen;
