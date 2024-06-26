import { ALL_USER_FAIL, ALL_USER_REQ, ALL_USER_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQ, DELETE_USER_RESET, DELETE_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQ, LOAD_USER_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQ, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_ADMIN_FAIL, UPDATE_USER_ADMIN_REQ, UPDATE_USER_ADMIN_RESET, UPDATE_USER_ADMIN_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQ, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQ, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQ, USER_SIGNUP_SUCCESS } from "../constants/userConstant";


export const userReducer =(state={user:{}},action)=>{
    switch (action.type) {
        case USER_LOGIN_REQ:
        case USER_SIGNUP_REQ:
        case LOAD_USER_REQ:
            return{
                loading:true,
                isAuthenticated: false
            }
        case USER_LOGIN_SUCCESS:
        case USER_SIGNUP_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated: true,
                user:action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                loading:false,
                isAuthenticated: false,
                user: null
            }
        case USER_LOGIN_FAIL:
        case USER_SIGNUP_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }
        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}


export const profileReducer =(state={user:{}},action)=>{
    switch (action.type) {
        case UPDATE_USER_REQ:
        case UPDATE_PASSWORD_REQ:
        case UPDATE_USER_ADMIN_REQ:
        case DELETE_USER_REQ:
            return{
                ...state,
                loading:true,
            }
        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_ADMIN_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            }
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload.success,
                message:action.payload.message,
            }
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_ADMIN_FAIL:
        case DELETE_USER_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_ADMIN_RESET:
            return{
                ...state,
                isUpdated: false,
                loading: false
            }
        case DELETE_USER_RESET:
            return{
                ...state,
                isDeleted: false,
                loading: false
            }
        
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}
export const allUsersReducer =(state={users:[]},action)=>{
    switch (action.type) {
        case ALL_USER_REQ:
            return{
                ...state,
                loading:true,
            }
        case ALL_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.payload
            }
        case ALL_USER_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}
export const userDetailsReducer =(state={user:{}},action)=>{
    switch (action.type) {
        case USER_DETAILS_REQ:
            return{
                ...state,
                loading:true,
            }
        case USER_DETAILS_SUCCESS:
            return{
                ...state,
                loading:false,
                user:action.payload
            }
        case USER_DETAILS_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            };
    
        default:
            return state;
    }
}
