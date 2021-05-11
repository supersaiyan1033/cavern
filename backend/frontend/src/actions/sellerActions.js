import axios from 'axios'
import {
    ADDSTOCKS_NEW_SUCCESS,
    ADDSTOCKS_NEW_REQUEST,
    ADDSTOCKS_NEW_FAIL,
    ADDSTOCKS_NEW_RESET,
    ADDSTOCKS_OLD_SUCCESS,
    ADDSTOCKS_OLD_REQUEST,
    ADDSTOCKS_OLD_FAIL,
    ADDSTOCKS_OLD_RESET
} from '../constants/sellerConstants'

export const addNewStock = () => async (dispatch) => {
    try {
        dispatch({
            type: ADDSTOCKS_NEW_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        dispatch({
            type: ADDSTOCKS_NEW_SUCCESS,
            payload:[]
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: ADDSTOCKS_NEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const addNewParticularStock = (sid,Name,Brand,Category,Details,Price,Quantity) => async (dispatch) => {
    try {
        dispatch({
            type: ADDSTOCKS_NEW_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/addnewparticularstock/${sid}`,
            {'Name':Name,'Brand':Brand,'Category':Category,'Details':Details,'Price':Price,'Quantity':Quantity},
            config
        )

        dispatch({
            type: ADDSTOCKS_NEW_SUCCESS,
            payload: []
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: ADDSTOCKS_NEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const addOldStock = (sid) => async (dispatch) => {
    try {
        dispatch({
            type: ADDSTOCKS_OLD_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(
            `/api/addoldstocks/${sid}`,
            config
        )

        dispatch({
            type: ADDSTOCKS_OLD_SUCCESS,
            payload: data
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: ADDSTOCKS_OLD_FAIL,
            payload:error.response.data.message
        })
    }
}

export const addOldParticularStock = (sid,skid,quantity) => async (dispatch) => {
    try {
        dispatch({
            type: ADDSTOCKS_OLD_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(
            `/api/addoldparticularstock/${sid}/${skid}/${quantity}`,
            config
        )

        dispatch({
            type: ADDSTOCKS_OLD_SUCCESS,
            payload: data
        })

       /* localStorage.setItem('userInfo', JSON.stringify(data)) */

    } catch (error) {
        dispatch({
            type: ADDSTOCKS_OLD_FAIL,
            payload:error.response.data.message
        })
    }
}
