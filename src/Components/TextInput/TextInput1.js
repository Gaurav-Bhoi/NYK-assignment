import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import {regularTextStyle} from '../../CommonStyles/CommonStyles';

const TextInput1 = ({
  buttonContainerStyle = {},
  configureTextChange = () => {},
  placeHolder = '',
  keyboardType = 'default',
  isPassword = false,
  textValue = undefined,
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    configureTextChange(text);
  }, [text, configureTextChange]);

  return (
    <View style={[styles.buttonContainer, buttonContainerStyle]}>
      <TextInput
        style={[styles.input, regularTextStyle]}
        onChangeText={setText}
        value={text}
        placeholder={placeHolder}
        defaultValue={textValue}
        keyboardType={keyboardType}
        secureTextEntry={isPassword}
      />
    </View>
  );
};

export default TextInput1;

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    width: '90%',
    height: Responsive(27),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Responsive(5),
    borderColor: Colors.borderGray,
  },
  input: {
    width: '100%',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
});
