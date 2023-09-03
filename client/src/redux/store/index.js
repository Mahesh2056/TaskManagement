import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "../reducerSlices/userSlice"
import storage from 'redux-persist/lib/storage';
// import locationSlice from "../reducerSlices/locationSlice";
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger'
const persistConfig = {
 key: 'root',
 storage
}
 
const reducer = combineReducers({
 user: userSlice,
//other slices will be here
});
const persistedReducer = persistReducer(persistConfig, reducer)
 
export const store = configureStore({
 reducer: persistedReducer,
 middleware: [logger]
});
 
export const persistor = persistStore(store)