import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../Common/CartItem';
import { addToCart, removeFromCart, removeFromWishlist } from '../Redux/actions';

const wishlist = () => {
    const [cartList, setCartList] = useState([]);
    const WishtData = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, backgroundColor: '#C9E6F0' }}>
            <StatusBar backgroundColor="#C9E6F0" barStyle="light-content" />
            <View style={style.appBar}>
                <Text style={style.title}>WishList</Text>
            </View>
            {WishtData.length>0  ? (
            <FlatList data={WishtData} renderItem={({ item, index }) => {
                return <CartItem isWishlist={'yes'} item={item}
                    onRemoveFromWishlist={() => {
                        dispatch(removeFromWishlist(index));
                    }}
                    onAddToCart={(x) => {
                        dispatch(addToCart(x));
                    }} />;
            }} style={{ marginTop: 10, marginBottom: 50 }} />
            ): (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 15, color: 'black' }}>No Item Added In The WishList</Text>
            </View>
            )}
        </View>
    );
};
const style = StyleSheet.create({
    appBar: {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C9E6F0',
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: '500',
        marginLeft: 30,
    },
});
export default wishlist;