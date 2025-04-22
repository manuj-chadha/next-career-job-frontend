import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

// persist config for auth slice with migration logic
const authPersistConfig = {
  key: 'auth',
  storage,
  version: 2,  // Increment version to trigger migration
  migrate: (state) => {
    if (typeof state?.loading === 'string') {
      state.loading = state.loading === 'true';  // Convert string "true"/"false" to boolean
    }
    if (state?.user === 'null') {
      state.user = null;  // Convert string "null" to actual null
    }
    return Promise.resolve(state); // Return the modified state
  },
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  job: jobSlice,
  company: companySlice,
  application: applicationSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
