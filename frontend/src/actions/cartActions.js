import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_GET_REQUEST,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_ADD_REQUEST,
    CART_SAVE_PAYMENT_METHOD,
    CART_UPDATE,
    CART_REMOVE_REQUEST,
    CART_REMOVE_SUCCESS,
    CART_UPDATE_SUCCESS
} from '../constants/cartConstants'


export const addToCart = (id, qty) => async (dispatch, getState) => {

    dispatch({
        type:CART_ADD_REQUEST
    })
     const {
            userLogin: { userInfo },
        } = getState()
    const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
    const { data } = await axios.put(`/api/cart/product/${id}`,
         {'buyerId':userInfo.buyerId,'quantity':qty},
        config
    )
    dispatch({
        type: CART_ADD_ITEM,
        payload: data
    })
    const information = await axios.get(`api/mycart/${userInfo.buyerId}`)
    console.log(information)
    dispatch({
        type:CART_UPDATE,
        payload:information.data
    })
    dispatch({
        type:CART_UPDATE_SUCCESS
    })
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const getCart = () => async (dispatch, getState) => {

    dispatch({
        type:CART_GET_REQUEST
    })
     const {
            userLogin: { userInfo },
        } = getState()
    const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
  
   
    const information = await axios.get(`api/mycart/${userInfo.buyerId}`)
    console.log(information)
    dispatch({
        type:CART_UPDATE,
        payload:information.data
    })
    dispatch({
        type:CART_UPDATE_SUCCESS
    })
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type:CART_REMOVE_REQUEST
    })
    await axios.delete(`/api/cart/delete/${id}`)
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })
    dispatch({
        type:CART_REMOVE_SUCCESS
    })
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}