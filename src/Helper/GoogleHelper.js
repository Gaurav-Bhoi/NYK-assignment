import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    scopes: ['email', 'profile'],
    webClientId:
      '583933817069-4m5njski3q0r21q4t07stnmi91qmbtqm.apps.googleusercontent.com',
  });
};
