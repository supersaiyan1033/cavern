import {
    ADDSTOCKS_NEW_SUCCESS,
    ADDSTOCKS_NEW_REQUEST,
    ADDSTOCKS_NEW_FAIL,
    ADDSTOCKS_NEW_RESET,
    ADDSTOCKS_OLD_SUCCESS,
    ADDSTOCKS_OLD_REQUEST,
    ADDSTOCKS_OLD_FAIL,
    ADDSTOCKS_OLD_RESET,
    USER_ORDERS_PLACED_SUCCESS,
    USER_ORDERS_PLACED_REQUEST,
    USER_ORDERS_PLACED_FAIL,
    USER_ORDERS_PLACED_RESET
} from '../constants/sellerConstants'

export const addNewStocksReducer = (state = { }, action) => {
    switch (action.type) {
        case ADDSTOCKS_NEW_REQUEST:
            return { loading: true }

        case ADDSTOCKS_NEW_SUCCESS:
            return { loading: false, addNewStocks: action.payload }

        case ADDSTOCKS_NEW_FAIL:
            return { loading: false, error: action.payload }
        case ADDSTOCKS_NEW_RESET :
            return {addNewStocks:null}
        default:
            return state
    }
}

export const addOldStocksReducer = (state = { }, action) => {
    switch (action.type) {
        case ADDSTOCKS_OLD_REQUEST:
            return { loading: true }

        case ADDSTOCKS_OLD_SUCCESS:
            return { loading: false, addOldStocks: action.payload }

        case ADDSTOCKS_OLD_FAIL:
            return { loading: false, error: action.payload }
        case ADDSTOCKS_OLD_RESET :
            return {addOldStocks:null}
        default:
            return state
    }
}

export const userOrderRequestsReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_ORDERS_PLACED_REQUEST:
            return { loading: true }

        case USER_ORDERS_PLACED_SUCCESS:
            return { loading: false, userOrderRequests: action.payload }

        case USER_ORDERS_PLACED_FAIL:
            return { loading: false, error: action.payload }
        case USER_ORDERS_PLACED_RESET :
            return {userOrderRequests:null}
        default:
            return state
    }
}