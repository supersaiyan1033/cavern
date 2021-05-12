import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,
    USER_LOGOUT_REQUEST,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

import { VERIFIED_SELLERS_RESET,
    UNVERIFIED_SELLERS_RESET,
    ADMINS_LIST_RESET,
    RETURN_PRODUCTS_RESET,
    DELIVER_PRODUCTS_RESET
   } from '../constants/adminConstants'

export const login = (email, password,role) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/login/',
            { 'email': email, 'password': password,'role':role},
            config
        )
        console.log(data)
        if (data.role)
        {
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        }
        else {
            dispatch({
                type:USER_LOGOUT_REQUEST
            })
            dispatch({
                type:USER_LOGOUT
            })
        }

        // localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}


export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    await axios.post(`/api/logout`)
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: VERIFIED_SELLERS_RESET })
    dispatch({ type: UNVERIFIED_SELLERS_RESET }) 
    dispatch({ type: ADMINS_LIST_RESET})
    dispatch({ type: RETURN_PRODUCTS_RESET})
    dispatch({ type: DELIVER_PRODUCTS_RESET})

}


export const register = (name,email,phone,address, password,role,company) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/register/',
            { 'email': email, 'password': password ,'name':name,'address':address,'phone':phone,'role':role,'company':company },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                 Authorization: `Bearer ${userInfo.role=='buyer'?userInfo.buyerId:userInfo.role=='seller'?userInfo.sellerId:userInfo.adminId}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/${userInfo.role}`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.role=='buyer'?userInfo.buyerId:userInfo.role=='seller'?userInfo.sellerId:userInfo.adminId}`
            }
        }

        const { data } = await axios.post(
            `/api/profile/update/`,
            {'user':user,'role':userInfo.role},
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}






