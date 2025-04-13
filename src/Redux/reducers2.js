import { ADD_WISHLIST, REMOVE_FROM_WISHLIST } from "./ActionType";

const reducer2 = (state = [], action) => {
    switch (action.type) {
        case ADD_WISHLIST:
            return [...state, action.payload];

        case REMOVE_FROM_WISHLIST:
            return state.filter((_, index) => index !== action.payload);

        default:
            return state;
    }
};

export default reducer2;
