import { ALL_ORDER_FAIL, ALL_ORDER_REQ, ALL_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQ, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQ, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQ, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQ, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQ, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from "../constants/orderConstant";


export const newOrderReducer = (state={order:{}},action)=>{

    switch (action.type) {
        case CREATE_ORDER_REQ:
            return{
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return{
                loading: false,
                order: action.payload
            };
        case CREATE_ORDER_FAIL:
            return{
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}

export const myOrderReducer = (state={orders:[]},action)=>{

    switch (action.type) {
        case MY_ORDER_REQ:
            return{
                loading: true,
            };
        case MY_ORDER_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            };
        case MY_ORDER_FAIL:
            return{
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}
export const orderReducer = (state={orders:{}},action)=>{

    switch (action.type) {
        case UPDATE_ORDER_REQ:
        case DELETE_ORDER_REQ:
            return{
                loading: true,
                ...state
            };
        case UPDATE_ORDER_SUCCESS:
            return{
                loading: false,
                isUpdated: action.payload,
                ...state
            };
        case DELETE_ORDER_SUCCESS:
            return{
                loading: false,
                isDeleted: action.payload,
                ...state
            };
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return{
                loading: false,
                error: action.payload,
                ...state
            };
        case UPDATE_ORDER_RESET:
            return{
                isUpdated: false,
                loading: false,
            };
        case DELETE_ORDER_RESET:
            return{
                isDeleted: false,
                loading: false,
                ...state
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}

export const allOrderReducer = (state={orders:[]},action)=>{

    switch (action.type) {
        case ALL_ORDER_REQ:
            return{
                loading: true,
            };
        case ALL_ORDER_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            };
        case ALL_ORDER_FAIL:
            return{
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}

export const orderDetailsReducer = (state={order:{}},action)=>{

    switch (action.type) {
        case ORDER_DETAILS_REQ:
            return{
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return{
                loading: false,
                order: action.payload
            };
        case ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}