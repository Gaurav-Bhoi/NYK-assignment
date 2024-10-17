import {configureStore} from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import rootReducer2 from './combiner';

export const store = configureStore({
  reducer: rootReducer2,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
