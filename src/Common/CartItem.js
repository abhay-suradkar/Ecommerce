import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

const CartItem = ({
  item,
  onRemoveItem,
  onAddWishlist,
  isWishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onQuantityChange,
}) => {
  // Initialize with 1. Don't depend on item.quantity unless you're lifting the state up.
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    const newQty = item.quantity + 1;
    setQuantity(newQty);
    if (onQuantityChange) {
      onQuantityChange(item, newQty); // Notify parent
    }
  };

  const decreaseQuantity = () => {
    const newQty = item.quantity > 1 ? item.quantity - 1 : 1;
    setQuantity(newQty);
    if (onQuantityChange) {
      onQuantityChange(item, newQty); // Notify parent
    }
  };

  const heartButtonStyle = {
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 17,
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View
      style={{
        width: '94%',
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#C9E6F0',
        margin: 10,
        marginBottom: 20,
      }}
    >
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: 120,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        resizeMode="cover"
      />

      <View style={{ flexDirection: 'row', padding: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
          <Text style={{ fontSize: 15, fontWeight: '600', marginTop: 5 }}>{item.product_id}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#C9E6F0',
            borderWidth: 1,
            borderRadius: 15,
            borderColor: 'black',
            paddingHorizontal: 5,
            paddingVertical: 5,
            elevation: 5,
          }}
        >
          <TouchableOpacity
            onPress={decreaseQuantity}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              width: 25,
              height: 25,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>-</Text>
          </TouchableOpacity>

          <Text style={{ marginHorizontal: 12, fontSize: 15, fontWeight: 'bold' }}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={increaseQuantity}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              width: 25,
              height: 25,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
      >
        <Text style={{ fontSize: 15 }}>{'₹' + item.price}</Text>

        {isWishlist ? (
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 7,
              paddingHorizontal: 10,
            }}
            onPress={() => onAddToCart(item)}
          >
            <Text style={{ fontSize: 10 }}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 7,
              paddingHorizontal: 10,
              marginLeft: 50,
            }}
            onPress={() => onRemoveItem(item)}
          >
            <Text style={{ fontSize: 10 }}>Remove item</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={heartButtonStyle}
        onPress={isWishlist ? () => onRemoveFromWishlist(item) : () => onAddWishlist(item)}
      >
        <Image
          source={
            isWishlist
              ? require('../Images/blackheart.png')
              : require('../Images/heart.png')
          }
          style={{
            height: 20,
            width: 20,
            tintColor: isWishlist ? 'red' : 'gray',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
