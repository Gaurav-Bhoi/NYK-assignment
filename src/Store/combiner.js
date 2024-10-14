import {combineReducers} from 'redux';
import {userReducer} from './Reducers/user';
import {postReducer} from './Reducers/posts';
import {authReducer} from './Reducers/auth';
import {persistReducer, createTransform} from 'redux-persist';
import {parse, stringify} from 'flatted';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export const transformCircular = createTransform(
  inboundState => stringify(inboundState),
  outboundState => parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: '',
  stateReconciler: autoMergeLevel2,
  blacklist: ['Post'],
  transforms: [transformCircular],
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  auth: authReducer,
});

const rootReducer2 = persistReducer(persistConfig, rootReducer);

export default rootReducer2;
