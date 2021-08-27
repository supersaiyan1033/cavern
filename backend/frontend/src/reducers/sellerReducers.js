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
    USER_ORDERS_PLACED_RESET,
    ADDOFFERS_SUCCESS,
    ADDOFFERS_REQUEST,
    ADDOFFERS_FAIL,
    ADDOFFERS_RESET,
    REMOVEOFFERS_SUCCESS,
    REMOVEOFFERS_REQUEST,
    REMOVEOFFERS_FAIL,
    REMOVEOFFERS_RESET
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

export const addOffersReducer = (state = { }, action) => {
    switch (action.type) {
        case ADDOFFERS_REQUEST:
            return { loading: true }

        case ADDOFFERS_SUCCESS:
            return { loading: false, addOffers: action.payload }

        case ADDOFFERS_FAIL:
            return { loading: false, error: action.payload }
        case ADDOFFERS_RESET :
            return {addOffers:null}
        default:
            return state
    }
}

export const removeOffersReducer = (state = { }, action) => {
    switch (action.type) {
        case REMOVEOFFERS_REQUEST:
            return { loading: true }

        case REMOVEOFFERS_SUCCESS:
            return { loading: false, removeOffers: action.payload }

        case REMOVEOFFERS_FAIL:
            return { loading: false, error: action.payload }
        case REMOVEOFFERS_RESET :
            return {removeOffers:null}
        default:
            return state
    }
}