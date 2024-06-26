import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQ, ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQ, DELETE_REVIEW_RESET, DELETE_REVIEW_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQ, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQ, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstant";


export const productReducer = (state={products:[]},action)=>{

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return{
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            };
        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading: false,
                products: action.payload
            };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
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

export const productDetailsReducer=(state={product:{}},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return{
                loading: false,
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

export const newProductReducer=(state={},action)=>{
    switch (action.type) {
        case NEW_PRODUCT_REQ:
            return{
                loading: true,
                ...state
            }
        case NEW_PRODUCT_SUCCESS:
            return{
                loading: false,
                product: action.payload.product,
                success: action.payload.success
            }
        case NEW_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload
            }  
        case NEW_PRODUCT_RESET:
            return{
                loading: false,
                success: false,
                ...state
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
export const productUpdateReducer=(state={},action)=>{
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return{
                loading: true,
                ...state
            }
        case PRODUCT_UPDATE_SUCCESS:
            return{
                loading: false,
                product: action.payload.product,
                isUpdated: action.payload.success,
                ...state
            }
        case PRODUCT_UPDATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }  
        case PRODUCT_UPDATE_RESET:
            return{
                loading: false,
                isUpdated: false,
                ...state
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

export const newReviewReducer=(state={},action)=>{
    switch (action.type) {
        case NEW_REVIEW_REQ:
            return{
                loading: true,
                ...state
            }
        case NEW_REVIEW_SUCCESS:
            return{
                loading: false,
                success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return{
                loading: false,
                success: false,
                ...state
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
export const productReviewReducer=(state={reviews: []},action)=>{
    switch (action.type) {
        case ALL_REVIEW_REQ:
            return{
                loading: true,
                ...state
            }
        case ALL_REVIEW_SUCCESS:
            return{
                loading: false,
                reviews: action.payload
            }
        case ALL_REVIEW_FAIL:
            return{
                loading: false,
                error: action.payload,
                ...state
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

export const productDeleteReducer=(state={},action)=>{
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return{
                loading: true,
                ...state
            }
        case PRODUCT_DELETE_SUCCESS:
            return{
                loading: false,
                isDeleted: action.payload,
                ...state
            }
        case PRODUCT_DELETE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case PRODUCT_DELETE_RESET:
            return{
                loading: false,
                isDeleted: false,
                ...state
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
export const reviewDeleteReducer=(state={},action)=>{
    switch (action.type) {
        case DELETE_REVIEW_REQ:
            return{
                loading: true,
                ...state
            }
        case DELETE_REVIEW_SUCCESS:
            return{
                loading: false,
                isDeleted: action.payload,
                ...state
            }
        case DELETE_REVIEW_FAIL:
            return{
                loading: false,
                error: action.payload,
                ...state
            }
        case DELETE_REVIEW_RESET:
            return{
                loading: false,
                isDeleted: false,
                ...state
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