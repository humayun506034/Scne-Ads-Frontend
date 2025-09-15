import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import authSlice from './Slices/AuthSlice/authSlice';



const persistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice)




export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer   // will save authSlice in local storage permanently , refresh a chole jabe na 
    //  array notation a name peye jabe ar reducer export kora hoynai tai .reducer access kore dite hobe

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {

      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(baseApi.middleware),
});
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
