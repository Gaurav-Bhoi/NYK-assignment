import {combineReducers} from 'redux';
import {userReducer} from './Reducers/user';
import {postReducer} from './Reducers/posts';
import {authReducer} from './Reducers/auth';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  auth: authReducer,
});

export default rootReducer;
