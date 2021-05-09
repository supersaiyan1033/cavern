import {
    VERIFIED_SELLERS_REQUEST,
    VERIFIED_SELLERS_SUCCESS,
    VERIFIED_SELLERS_FAIL,
    UNVERIFIED_SELLERS_REQUEST,
    UNVERIFIED_SELLERS_SUCCESS,
    UNVERIFIED_SELLERS_FAIL
} from '../constants/adminConstants'

export const verifiedSellersReducer = (state = { }, action) => {
    switch (action.type) {
        case VERIFIED_SELLERS_REQUEST:
            return { loading: true }

        case VERIFIED_SELLERS_SUCCESS:
            return { loading: false, verifiedSellers: action.payload }

        case VERIFIED_SELLERS_FAIL:
            return { loading: false, error: action.payload }
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
        default: 
            return state
    }
}
