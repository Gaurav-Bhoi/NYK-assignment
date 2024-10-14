import {AllActions} from '../actionIndex';

const initialState = {
  userDetails: {
    userName: 'Test',
    email: 'test@gmail.com',
    phone: '7028189930',
    desc: 'dsjsdjgpsjpsjpodsf',
    birthDate: '12/02/98',
    profileType: 'icon',
    profilePic: '',
  },
  userPosts: [],
  userCreds: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AllActions.SET_USER_DETAILS: {
      return {...state, userDetails: action.payload};
    }

    case AllActions.SET_USERPOST_LIST: {
      return {...state, userPosts: [...state.userPosts, action.payload]};
    }

    default: {
      return state;
    }
  }
};
