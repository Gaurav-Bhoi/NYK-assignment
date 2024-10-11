import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './combiner';

export const store = configureStore({reducer: rootReducer});
