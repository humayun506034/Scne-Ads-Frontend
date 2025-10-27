import { configureStore } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'; // Import js-cookie
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { baseApi } from "./api/baseApi";
import authSlice from './Slices/AuthSlice/authSlice';
import campaignReducer from './Slices/campaign/campaignSlice';


const cookieStorage = {
  getItem: (key: string) => {
    return Promise.resolve(Cookies.get(key));
  },
  setItem: (key: string, value: string) => {
    return Promise.resolve(Cookies.set(key, value, { expires: 365, path: '/' }));
  },
  removeItem: (key: string) => {
    return Promise.resolve(Cookies.remove(key));
  }
};


const persistConfig = {
  key: 'auth_v2',
  storage: cookieStorage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    campaign: campaignReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
