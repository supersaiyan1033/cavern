import axios from 'axios'
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

      

    } catch (error) {
        dispatch({
            type: ADDSTOCKS_OLD_FAIL,
            payload:error.response.data.message
        })
    }
}


export const userOrderRequest = (sid) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ORDERS_PLACED_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get(
            `/api/userorderrequests/${sid}/`,
            config
        )
        dispatch({
            type: USER_ORDERS_PLACED_SUCCESS,
            payload:data
        })

      

    } catch (error) {
        dispatch({
            type: USER_ORDERS_PLACED_FAIL,
            payload:error.response.data.message
        })
    }
}

export const processRequest = (sid,oid) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ORDERS_PLACED_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get(
            `/api/processrequest/${sid}/${oid}/`,
            config
        )
        dispatch({
            type: USER_ORDERS_PLACED_SUCCESS,
            payload:data
        })

     

    } catch (error) {
        dispatch({
            type: USER_ORDERS_PLACED_FAIL,
            payload:error.response.data.message
        })
    }
}

export const addOffer = (sid) => async (dispatch) => {
    try {
        dispatch({
            type: ADDOFFERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get(
            `/api/addoffers/${sid}/`,
            config
        )
        dispatch({
            type: ADDOFFERS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: ADDOFFERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const addParticularOffer = (sid,skid,offer) => async (dispatch) => {
    try {
        dispatch({
            type: ADDOFFERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get(
            `/api/addparticularoffer/${sid}/${skid}/${offer}/`,
            config
        )
        dispatch({
            type: ADDOFFERS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: ADDOFFERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const removeOffer = (sid) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVEOFFERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get(
            `/api/removeoffers/${sid}`,
            config
        )
        dispatch({
            type: REMOVEOFFERS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: REMOVEOFFERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const removeParticularOffer = (sid,ofid) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVEOFFERS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.get(
            `/api/removeparticularoffer/${sid}/${ofid}/`,
            config
        )
        dispatch({
            type: REMOVEOFFERS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: REMOVEOFFERS_FAIL,
            payload:error.response.data.message
        })
    }
}