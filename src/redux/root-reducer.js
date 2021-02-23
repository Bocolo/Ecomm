import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// storage -- local storage : sessionStorage -- storing across sessions(dif lib for session)
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import shopReducer from './shop/shop.reducer';
import directoryReducer from './directory/directory.reducer';

const persistConfig = {
    key: 'root',
    storage,
    //user handled by firebase, so only need to whitlist{persist} cart
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer

});
export default persistReducer(persistConfig, rootReducer);