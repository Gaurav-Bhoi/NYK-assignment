import {AllActions} from '../actionIndex';

const initialState = {
  isUserLoggedin: false,
  authDetails: {
    id: '',
    password: '',
  },

  usersList: [{id: 'test@123', password: 'Test@123'}],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AllActions.SET_AUTH_DETAILS: {
      return {...state, auth: action.payload};
    }

    case AllActions.SET_USERS_LIST: {
      return {...state, usersList: [...state.usersList, action.payload]};
    }
    default: {
      return state;
    }
  }
};
