import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import {mediumTextStyle} from '../../CommonStyles/CommonStyles';

const Button1 = ({
  title = 'Button',
  buttonContainerStyle = {},
  titleStyle = {},
  isIcon = false,
  IconComponent,
  isImage = false,
  ImageComponent,
  configureOnPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonContainerStyle]}
      onPress={configureOnPress}>
      {isIcon && <IconComponent />}
      {isImage && <ImageComponent />}
      <Text style={[mediumTextStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button1;

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Responsive(5),
    paddingVertical: Responsive(5),
    borderColor: Colors.borderGray,
  },
});
