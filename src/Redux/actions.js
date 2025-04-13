import { retry } from "@reduxjs/toolkit/query";
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_WISHLIST, REMOVE_FROM_WISHLIST, ADD_ADDRESS, DELETE_ADDRESS, CLEAR_CART} from "./ActionType";

export const addToCart = data => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeFromCart = index => ({
    type: REMOVE_FROM_CART,
    payload: index,
});

export const addToWishlist = data => ({
    type: ADD_WISHLIST,
    payload: data,
  });

export const removeFromWishlist = index => ({
    type: REMOVE_FROM_WISHLIST,
    payload: index,
})

export const addAddress = (item) => {
    return {
        type: ADD_ADDRESS,
        payload: item,
    };
};

export const deleteAddress = (index) => {
    return {
        type: DELETE_ADDRESS,
        payload: index,
    };
};

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};