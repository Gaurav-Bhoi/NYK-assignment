import {Alert, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../Assets/Colors';
import {Responsive} from '../../Assets/Responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomModal = ({
  children,
  modalVisible = false,
  navigation,
  showDragger = true,
  showCloseButton = true,
  autoClose = false,
  startAnimation = undefined,
  showBackButton = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(modalVisible);
  }, [modalVisible]);

  const onPressClose = () => {
    setIsModalVisible(false);
  };

  const onPressAutoClose = () => {
    if (autoClose) {
      setIsModalVisible(false);
    }
  };

  const dragger = () => {
    if (showDragger) {
      return (
        <TouchableOpacity style={styles.draggerContainer}>
          <View style={styles.dragger} />
        </TouchableOpacity>
      );
    }
  };

  const closeButton = () => {
    if (showCloseButton) {
      return (
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={onPressClose}>
            <MaterialIcons
              name="cancel"
              size={Responsive(22)}
              color={Colors.lightGray}
              style={{tintColor: 'red'}}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const onPressBack = () => {
    navigation.pop();
  };

  const backButton = () => {
    if (!showBackButton) {
      return;
    }
    return (
      <TouchableOpacity style={styles.arrowContainer} onPress={onPressBack}>
        <AntDesign
          name="arrowleft"
          size={Responsive(20)}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      animationType="none"
      visible={isModalVisible}
      transparent={true}
      onRequestClose={onPressClose}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={onPressAutoClose}
      />

      <View style={[styles.centeredView]}>
        {dragger()}
        {closeButton()}
        <View style={[styles.animViewStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  arrowContainer: {
    alignSelf: 'flex-start',
    marginLeft: Responsive(20),
    marginTop: Responsive(-7),
  },
  centeredView: {
    height: '60%',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.white,
    borderTopRightRadius: Responsive(10),
    borderTopLeftRadius: Responsive(10),
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: Responsive(10),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0,
  },
  closeButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  draggerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive(10),
  },
  container: {
    flex: 1,
  },
  dragger: {
    height: Responsive(5),
    width: Responsive(50),
    backgroundColor: Colors.primaryLightColor,
  },
  animViewStyle: {width: '100%', height: '100%'},
});
