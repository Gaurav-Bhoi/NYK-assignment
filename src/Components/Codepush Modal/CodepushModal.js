import {
  BackHandler,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CodePush from 'react-native-code-push';
import {checkVersion} from 'react-native-check-version';
import FastImage from 'react-native-fast-image';
import {Images} from '../../Assets/ImageIndex';

const CodepushModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startUpadte, setStartUpadte] = useState(false);
  const [updateType, setUpdateType] = useState(1);

  useEffect(() => {
    updateCheck();
  }, []);

  const updateCheck = async () => {
    const version = await checkVersion();
    console.log('this is version', version);
    CodePush.checkForUpdate()
      .then(async res => {
        console.log('this is res', JSON.stringify(res));
        if (!!res && !res?.failedInstall) {
          setIsVisible(true);
          setUpdateType(2);
        } else if (version?.needsUpdate) {
          setIsVisible(true);
          setUpdateType(1);
        }
      })
      .catch(e => console.log('this is e', e));
  };

  const onPressUpdate = () => {
    if (updateType === 1) {
      // Linking.openURL('https://quickreviews.click/apps')
      BackHandler.exitApp();
      const url =
        Platform.OS === 'android'
          ? 'https://play.google.com/store/apps/details?id=reviewApp.dev'
          : 'https://apps.apple.com/in/app/id6449814972';
      Linking.openURL(url).then(() => {});
    }

    if (updateType === 2) {
      setStartUpadte(true);
      updateApp();
    }
  };

  const updateApp = () => {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE},
      data => {
        if (
          data === CodePush.SyncStatus.UPDATE_INSTALLED ||
          data === CodePush.SyncStatus.UP_TO_DATE
        ) {
          setIsVisible(false);
          setStartUpadte(false);
        }
      },
      ({receivedBytes, totalBytes}) => {
        setProgress(Math.floor((receivedBytes / totalBytes) * 100));
      },
      () => {},
    );
  };

  return (
    <Modal visible={true}>
      <View style={styles.mainContainer}>
        <FastImage
          style={styles.gif}
          source={Images.updateGif}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </Modal>
  );
};

export default CodepushModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  gif: {flex: 1},
});
