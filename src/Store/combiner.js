import {combineReducers} from 'redux';
import userReducer from './Reducers/user';
import {postReducer} from './Reducers/posts';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
