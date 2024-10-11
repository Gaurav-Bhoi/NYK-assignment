import {LoginManager, Settings} from 'react-native-fbsdk-next';

export const intializeFbSdk = () => {
  Settings.setAppID('1577108202897217');
  Settings.initializeSDK();
};

export const loginFb = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(
      ['public_profile', 'email'],
      'limited',
      'my_nonce',
    );
    console.log('this is login fb res', result);
  } catch (error) {
    console.log(error);
  }
};
