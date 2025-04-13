import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./ActionType";

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload];

        case REMOVE_FROM_CART:
            return state.filter((_, index) => index !== action.payload);

        case CLEAR_CART: // Handle clearing the cart
            return [];

        default:
            return state;
    }
};

export default reducer;
