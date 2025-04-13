import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Cart from '../Bottam/cart';
import Main from '../Bottam/main';
import Profile from '../Bottam/profile';
import Search from '../Bottam/search';
import Wishlist from '../Bottam/wishlist';

const Home = () => {
  const [selectedTab, setselectedTab] = useState(0);
  
  // Correct Redux State Selection
  const cartItems = useSelector(state => state.cart);
  const wishlistItems = useSelector(state => state.wishlist);

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <Main />;
      case 1:
        return <Search />;
      case 2:
        return <Cart />;
      case 3:
        return <Wishlist />;
      case 4:
        return <Profile />;
      default:
        return <Main />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>{renderContent()}</View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setselectedTab(0)}>
          <Image source={require('../Images/home.png')} style={[styles.icon, { tintColor: selectedTab === 0 ? '#fff' : '#000' }]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setselectedTab(1)}>
          <Image source={require('../Images/magnifying-glass.png')} style={[styles.searchIcon, { tintColor: selectedTab === 1 ? '#fff' : '#000' }]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setselectedTab(2)}>
          <Image source={require('../Images/bag.png')} style={[styles.icon, { tintColor: selectedTab === 2 ? '#fff' : '#000' }]} />
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setselectedTab(3)}>
          <Image source={require('../Images/heart.png')} style={[styles.icon, { tintColor: selectedTab === 3 ? '#fff' : '#000' }]} />
          {wishlistItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{wishlistItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setselectedTab(4)}>
          <Image source={require('../Images/user.png')} style={[styles.icon, { tintColor: selectedTab === 4 ? '#fff' : '#000' }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    height: 60,
    width: '100%',
    backgroundColor: '#78B3CE',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 25,
    width: 25,
  },
  searchIcon: {
    height: 30,
    width: 30,
  },
  badge: {
    height: 20,
    width: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Home;
