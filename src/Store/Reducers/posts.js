import {AllActions} from '../actionIndex';

const initialState = {
  otherUserPosts: [],
  userCreds: {},
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case AllActions.GET_POST_IMAGES: {
      return {...state, otherUserPosts: action.payload};
    }

    default: {
      return state;
    }
  }
};
