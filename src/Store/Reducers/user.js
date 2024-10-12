import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const initialState = {
  userDetails: {},
  userCreds: {},
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      console.log('this is actions', action);
      return state;
    },
    setUserCreds: (state, action) => {
      Alert.alert('lol');
      console.log('this is action', action);
      return state;
    },
  },
});

export const {setUserCreds, setUserDetails} = user.actions;

export default user.reducer;
