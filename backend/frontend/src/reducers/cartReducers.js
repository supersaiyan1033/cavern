import {
    CART_ADD_ITEM,
    CART_ADD_REQUEST,
    CART_REMOVE_ITEM,
    CART_REMOVE_REQUEST,
    CART_REMOVE_SUCCESS,
    CART_UPDATE_SUCCESS,
    CART_GET_REQUEST,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_GET_PAYMENT_METHOD,
    CART_GET_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
    CART_UPDATE,
    SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants'



export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_REQUEST:
             return { loading: true, cartItems: []
               
            }
        case CART_GET_REQUEST:
            return {loading:true,cartItems:[]
               
            }
        case CART_UPDATE:
            return {
                ...state,
                loading:true,
                cartItems:action.payload,
             

            }
        case CART_UPDATE_SUCCESS:
            return {
                ...state,
                loading:false,
                cartItems:state.cartItems,
              
            }
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.stockId.stockId === item.stockId.stockId)

            if (existItem) {
                return {
                    ...state,
                    loading:true,
                    cartItems: state.cartItems.map(x =>
                        x.stockId.stockId === existItem.stockId.stockId ? item : x)
                }

            } else {
                return {
                    ...state,
                    loading:false,
                    cartItems: [...state.cartItems, item],
                   
                }
            }
        case CART_REMOVE_REQUEST:
            return {
                loading:true,
                cartItems:state.cartItems,

            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.stockId.stockId !== action.payload),
                loading:true
            }
        case CART_REMOVE_SUCCESS:
            return {
                ...state,
                cartItems:state.cartItems,
                loading:false
            }


        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}

export const addressReducer = (state ={shippingAddress :''},action) =>{
      switch (action.type) {
           case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                fetching:true,
                shippingAddress: action.payload,
            }
            case CART_GET_SHIPPING_ADDRESS:
                return {
                    ...state,
                    fetching:false,
                    shippingAddress:state.shippingAddress
                }
            default:
                return state
      }
}

export const paymentReducer = (state ={paymentMethod :''},action) =>{
      switch (action.type) {
           case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                getting:true,
                paymentMethod: action.payload,
            }
            case CART_GET_PAYMENT_METHOD:
                return {
                    ...state,
                    getting:false,
                    paymentMethod:state.paymentMethod
                }
            default:
                return state
      }
}