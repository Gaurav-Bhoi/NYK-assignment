import {
  BackHandler,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import CodePush from 'react-native-code-push';
import {checkVersion} from 'react-native-check-version';
import FastImage from 'react-native-fast-image';
import {Images} from '../../Assets/ImageIndex';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import {regularTextStyle} from '../../CommonStyles/CommonStyles';
import Fonts from '../../Assets/Fonts';

const CodepushModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [codepushStatus, setCodepushStatus] = useState(
    'checking for updates...',
  );

  useEffect(() => {
    updateCheck();
  }, [updateCheck]);

  const updateCheck = useCallback(async () => {
    try {
      const codePushRes = await CodePush.checkForUpdate();

      if (!!codePushRes) {
        downloadAndInstallUpdate();
      }
    } catch (e) {
      setIsVisible(false);
      ToastAndroid.showWithGravityAndOffset(
        'Failed to install latest version of app',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }, []);

  const downloadAndInstallUpdate = async () => {
    try {
      CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
          mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
          gnoreFailedUpdates: true,
        },
        status => {
          switch (status) {
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              setCodepushStatus('Downloading update: ');
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              setCodepushStatus('Installing update...');
              break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              setCodepushStatus('Update installed');
              setIsVisible(false);
              break;
            default:
              setIsVisible(false);
              ToastAndroid.showWithGravityAndOffset(
                'No updates available !',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              break;
          }
        },

        ({receivedBytes, totalBytes}) => {
          const update = Math.floor((receivedBytes / totalBytes) * 100);

          setProgress(update);
        },
        () => {},
      );
    } catch (error) {}
  };

  return (
    <Modal visible={isVisible}>
      <View style={styles.mainContainer}>
        <FastImage
          style={styles.gif}
          source={Images.updateGif}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.updateContainer}>
          <AnimatedCircularProgress
            size={Responsive(80)}
            width={Responsive(3)}
            backgroundWidth={Responsive(8)}
            fill={progress}
            rotation={0}
            tintColor={Colors.primaryColor}
            backgroundColor={Colors.white}>
            {fill => (
              <FastImage
                style={styles.appLogo}
                source={Images.nykWhiteLogo}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </AnimatedCircularProgress>
          <Text style={[styles.status]}>
            {codepushStatus}
            {codepushStatus === 'Downloading update: ' ? `${progress} %` : ''}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CodepushModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  status: {
    marginTop: Responsive(8),
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: Responsive(12),
  },
  gif: {flex: 1},
  updateContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: Responsive(50),
  },
  appLogo: {height: Responsive(60), width: Responsive(60)},
});
