import {combineReducers} from 'redux';
import userReducer from './Reducers/user';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
