import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import {infoTextStyle, regularTextStyle} from '../../CommonStyles/CommonStyles';

const TextInput1 = ({
  buttonContainerStyle = {},
  configureTextChange = () => {},
  placeHolder = '',
  keyboardType = 'default',
  isPassword = false,
  textValue = undefined,
  infoText = undefined,
  mainContainer = {},
  isEditable = true,
  customTextStyle = {},
  configureOnPress = () => {},
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    configureTextChange(text);
  }, [text, configureTextChange]);

  return (
    <View style={mainContainer}>
      {infoText && <Text style={infoTextStyle}>{infoText}</Text>}
      <View style={[styles.buttonContainer, buttonContainerStyle]}>
        <TouchableOpacity style={styles.input} onPress={configureOnPress}>
          <TextInput
            style={[styles.input, regularTextStyle, customTextStyle]}
            onChangeText={setText}
            value={text}
            placeholder={placeHolder}
            defaultValue={textValue}
            keyboardType={keyboardType}
            secureTextEntry={isPassword}
            editable={isEditable}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextInput1;

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    width: '100%',
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
