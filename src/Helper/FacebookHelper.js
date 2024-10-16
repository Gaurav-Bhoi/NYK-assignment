import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

export const intializeFbSdk = () => {
  Settings.setAppID('1577108202897217');
  Settings.initializeSDK();
};

export const loginFb = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      console.log('User cancelled the login process');
      return;
    }

    // Get the access token
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining the access token');
    }

    // Create a Facebook credential with the access token
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in with the credential
    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );
    console.log('Logged in with Facebook:', userCredential.user);
  } catch (error) {
    console.log('Error during Facebook login:', error);
  }
};
