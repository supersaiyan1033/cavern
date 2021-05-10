import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './reducers/productReducers'

import { cartReducer,addressReducer,paymentReducer } from './reducers/cartReducers'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
    cancelOrderReducer,
    returnOrderReducer
} from './reducers/orderReducers'

/* admin func */
import {
    verifiedSellersReducer,
    unverifiedSellersReducer,
    adminsListReducer,
    deliverProductsReducer,
    returnProductsReducer
} from './reducers/adminReducers'  

import {
    addNewStocksReducer,
    addOldStocksReducer,
} from './reducers/sellerReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,
    shipping :addressReducer,
    payment:paymentReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    cancelOrder:cancelOrderReducer,
    returnOrder:returnOrderReducer,

    verifiedSellers:verifiedSellersReducer,
    unverifiedSellers:unverifiedSellersReducer,

    adminsList:adminsListReducer,
    returnProducts:returnProductsReducer,
    deliverProducts:deliverProductsReducer,

    addNewStocks:addNewStocksReducer,
    addOldStocks:addOldStocksReducer
    
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : ''


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
    shipping :{
        shippingAddress : ''
    },
    verifiedSellers:{verifiedSellers:[]},
    unverifiedSellers:{unverifiedSellers:[]},
    adminsList :{adminsList:[]},
    deliverProducts:{deliverProducts:[]},
    returnProducts:{returnProducts:[]},
    addNewStocks:{addNewstocks:[]},
    addOldStocks:{addOldStocks:[]}
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store