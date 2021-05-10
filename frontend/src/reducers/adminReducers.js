import {
    VERIFIED_SELLERS_REQUEST,
    VERIFIED_SELLERS_SUCCESS,
    VERIFIED_SELLERS_FAIL,
    VERIFIED_SELLERS_RESET,
    UNVERIFIED_SELLERS_REQUEST,
    UNVERIFIED_SELLERS_SUCCESS,
    UNVERIFIED_SELLERS_FAIL,
    UNVERIFIED_SELLERS_RESET,
    ADMINS_LIST_SUCCESS,
    ADMINS_LIST_REQUEST,
    ADMINS_LIST_FAIL,
    ADMINS_LIST_RESET,
    RETURN_PRODUCTS_SUCCESS,
    RETURN_PRODUCTS_REQUEST,
    RETURN_PRODUCTS_FAIL,
    RETURN_PRODUCTS_RESET,
    DELIVER_PRODUCTS_SUCCESS,
    DELIVER_PRODUCTS_REQUEST,
    DELIVER_PRODUCTS_FAIL,
    DELIVER_PRODUCTS_RESET
} from '../constants/adminConstants'

export const verifiedSellersReducer = (state = { }, action) => {
    switch (action.type) {
        case VERIFIED_SELLERS_REQUEST:
            return { loading: true }

        case VERIFIED_SELLERS_SUCCESS:
            return { loading: false, verifiedSellers: action.payload }

        case VERIFIED_SELLERS_FAIL:
            return { loading: false, error: action.payload }
        case VERIFIED_SELLERS_RESET :
            return {verifiedSellers:null}
        default:
            return state
    }
}

export const unverifiedSellersReducer = (state = { }, action) => {
    switch (action.type) {
        case UNVERIFIED_SELLERS_REQUEST:
            return { loading: true }

        case UNVERIFIED_SELLERS_SUCCESS:
            return { loading: false, unverifiedSellers: action.payload }

        case UNVERIFIED_SELLERS_FAIL:
            return { loading: false, error: action.payload }
        case UNVERIFIED_SELLERS_RESET :
            return {unverifiedSellers:null}
        default: 
            return state
    }
}

export const adminsListReducer = (state = { }, action) => {
    switch (action.type) {
        case ADMINS_LIST_REQUEST:
            return { loading: true }

        case ADMINS_LIST_SUCCESS:
            return { loading: false, adminsList: action.payload }

        case ADMINS_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ADMINS_LIST_RESET :
            return {adminsList:null}
        default:
            return state
    }
}

export const deliverProductsReducer = (state = { }, action) => {
    switch (action.type) {
        case DELIVER_PRODUCTS_REQUEST:
            return { loading: true }

        case DELIVER_PRODUCTS_SUCCESS:
            return { loading: false, verifiedSellers: action.payload }

        case DELIVER_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        case DELIVER_PRODUCTS_RESET :
            return {verifiedSellers:null}
        default:
            return state
    }
}

export const returnProductsReducer = (state = { }, action) => {
    switch (action.type) {
        case RETURN_PRODUCTS_REQUEST:
            return { loading: true }

        case RETURN_PRODUCTS_SUCCESS:
            return { loading: false, verifiedSellers: action.payload }

        case RETURN_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        case RETURN_PRODUCTS_RESET :
            return {verifiedSellers:null}
        default:
            return state
    }
}