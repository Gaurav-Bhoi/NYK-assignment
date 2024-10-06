import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../Assets/Colors';
import {Responsive} from '../../Assets/Responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomModal = ({
  children,
  modalVisible = true,
  showDragger = true,
  showCloseButton = true,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const onPressClose = () => {
    setIsModalVisible(false);
  };

  const onPressAutoClose = () => {
    setIsModalVisible(false);
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
          <TouchableOpacity>
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

  return (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      transparent={true}
      onRequestClose={onPressClose}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={onPressAutoClose}
      />
      <View style={styles.centeredView}>
        {dragger()}
        {closeButton()}
        {children}
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  centeredView: {
    height: '70%',
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
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
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
  },
  container: {
    flex: 1,
  },
  dragger: {
    height: Responsive(5),
    width: Responsive(50),
    backgroundColor: Colors.primaryColor,
  },
});
