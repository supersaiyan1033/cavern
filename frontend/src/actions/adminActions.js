import axios from 'axios'
import {
    VERIFIED_SELLERS_REQUEST,
    VERIFIED_SELLERS_SUCCESS,
    VERIFIED_SELLERS_FAIL,
    UNVERIFIED_SELLERS_REQUEST,
    UNVERIFIED_SELLERS_SUCCESS,
    UNVERIFIED_SELLERS_FAIL
} from '../constants/adminConstants'

export const verifiedSeller = () => async (dispatch) => {
    try {
        dispatch({
            type: VERIFIED_SELLERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(
            '/api/verifiedsellers/',
            config
        )

        dispatch({
            type: VERIFIED_SELLERS_SUCCESS,
            payload: data
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: VERIFIED_SELLERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const unverifiedSeller = () => async (dispatch) => {
    try {
        dispatch({
            type: UNVERIFIED_SELLERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
      
        const { data } = await axios.get(
            '/api/unverifiedsellers/',
            config
        )
       
        dispatch({
            type: UNVERIFIED_SELLERS_SUCCESS,
            payload: data
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: UNVERIFIED_SELLERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const verifySeller = (sid) => async (dispatch) => {
    try {
        dispatch({
            type: UNVERIFIED_SELLERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
      
        const { data } = await axios.get(
            `/api/verifyseller/${sid}/`,
            config
        )
       
        dispatch({
            type: UNVERIFIED_SELLERS_SUCCESS,
            payload: data
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: UNVERIFIED_SELLERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const removeSeller = (sid) => async (dispatch) => {
    try {
        dispatch({
            type: VERIFIED_SELLERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(
            `/api/removeseller/${sid}/`,
            config
        )

        dispatch({
            type: VERIFIED_SELLERS_SUCCESS,
            payload: data
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: VERIFIED_SELLERS_FAIL,
            payload:error.response.data.message
        })
    }
}