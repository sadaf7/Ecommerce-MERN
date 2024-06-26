import {createStore,applyMiddleware,combineReducers} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from '@redux-devtools/extension'
import { newProductReducer, newReviewReducer, productDeleteReducer, productDetailsReducer, productReducer, productReviewReducer, productUpdateReducer, reviewDeleteReducer } from './reducers/productReducer';
import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    deleteProd: productDeleteReducer,
    updateProduct: productUpdateReducer,
    allOrders: allOrderReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    allReviews: productReviewReducer,
    deleteReviews: reviewDeleteReducer
    
})

let initialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],

        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
        
    },
    
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;