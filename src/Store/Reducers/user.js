import {AllActions} from '../actionIndex';

const initialState = {
  userDetails: {
    userName: '',
    email: '',
    phone: '',
    desc: '',
    birthDate: '',
    profileType: 'icon',
    profilePic: '',
  },
  userCreds: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AllActions.SET_USER_DETAILS: {
      return {...state, userDetails: action.payload};
    }

    default: {
      return state;
    }
  }
};
