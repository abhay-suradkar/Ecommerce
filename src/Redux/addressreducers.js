import { ADD_ADDRESS, DELETE_ADDRESS } from './ActionType';

export const addressreducers = (state = [], action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return [...state, action.payload];

        case DELETE_ADDRESS:
            return state.filter((_, index) => index !== action.payload);

        default:
            return state;
    }
};
