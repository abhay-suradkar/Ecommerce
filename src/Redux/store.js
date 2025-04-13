import { createStore, combineReducers } from 'redux';
import CartReducer from './reduces';
import WishlistReducer from './reducers2';
import { addressreducers } from './addressreducers';

const rootReducer = combineReducers({
    cart: CartReducer,
    wishlist: WishlistReducer,
    address: addressreducers, 
});

// Create the store
const store = createStore(rootReducer);

export default store;
