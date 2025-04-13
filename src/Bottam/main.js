import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Myproductitem from '../Common/Myproductitem';
import { products } from '../product';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist } from '../Redux/actions';

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);
  const [tshirtlist, setTshirtlist] = useState([]);
  const [jeanslist, setJeanslist] = useState([]);
  const [shoeslist, setShoeslist] = useState([]);
  const [jacketlist, setJacketlist] = useState([]);
  const [slipperlist, setSlipperlist] = useState([]);
  const [trouserslist, setTrouserslist] = useState([]);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      let tempCategory = [];
      products.category.map(item => {
        tempCategory.push(item);
      });
      setCategorylist(tempCategory);
      setTshirtlist(products.category[0].data);
      setJeanslist(products.category[1].data);
      setShoeslist(products.category[2].data);
      setJacketlist(products.category[3].data);
      setSlipperlist(products.category[4].data);
      setTrouserslist(products.category[5].data);

      setLoading(false); // Hide loader after 2 seconds
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="#78B3CE" barStyle="light-content" />
      <View style={styles.appBar}>
        <Text style={styles.title}>Clothify</Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <ScrollView>
          <Image
            source={require('../Images/menfashion.png')}
            style={styles.headerImage}
          />
          <View>
            <FlatList
              data={categorylist}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryButton}>
                  <Text style={{ color: '#000' }}>{item.category}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <Text style={styles.sectionTitle}>New T Shirt</Text>
          <FlatList
            data={tshirtlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Myproductitem 
                item={item} 
                onAddWishlist={(x) => dispatch(addToWishlist(x))}
                onAddToCart={(x) => dispatch(addToCart(x))}
              />
            )}
          />
          <Text style={styles.sectionTitle}>New Jeans</Text>
          <FlatList
            data={jeanslist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Myproductitem 
                item={item} 
                onAddWishlist={(x) => dispatch(addToWishlist(x))}
                onAddToCart={(x) => dispatch(addToCart(x))}
              />
            )}
          />
          <Text style={styles.sectionTitle}>New Shoes</Text>
          <FlatList
            data={shoeslist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Myproductitem 
                item={item} 
                onAddWishlist={(x) => dispatch(addToWishlist(x))}
                onAddToCart={(x) => dispatch(addToCart(x))}
              />
            )}
          />
          <Text style={styles.sectionTitle}>New Jacket</Text>
          <FlatList
            data={jacketlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Myproductitem 
                item={item} 
                onAddWishlist={(x) => dispatch(addToWishlist(x))}
                onAddToCart={(x) => dispatch(addToCart(x))}
              />
            )}
          />
          <Text style={styles.sectionTitle}>New Slipper</Text>
          <FlatList
            data={slipperlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Myproductitem 
                item={item} 
                onAddWishlist={(x) => dispatch(addToWishlist(x))}
                onAddToCart={(x) => dispatch(addToCart(x))}
              />
            )}
          />
          <Text style={styles.sectionTitle}>Trousers</Text>
          <FlatList
            data={trouserslist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Myproductitem 
                item={item} 
                onAddWishlist={(x) => dispatch(addToWishlist(x))}
                onAddToCart={(x) => dispatch(addToCart(x))}
              />
            )}
            style={{ marginBottom: 50 }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#C9E6F0',
  },
  appBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#78B3CE',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
    fontFamily:'serif',
    textDecorationLine: 'underline',
    marginBottom: 10
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 200,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: '600',
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 20,
  },
});

export default Main;
