/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, TextInput, View } from 'react-native';

const CustomTextinput = ({
  value,
  onChangeText,
  Placeholder,
  icon,
  type,
  marginTop,
  keyboardType,
}) => {
  const [] = useState(value);
  return (
    <View
    style={{
        height: 50,
        width: '95%',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: marginTop || 50, // Use marginTop prop or default to 50
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    }}
    >
    <Image source={icon} style={{ height: 25, width: 25 }} />
    <TextInput
        placeholder={Placeholder}
        secureTextEntry={type ? true : false}
        placeholderTextColor={'black'}
        style={{ paddingLeft: 20, color: 'black', flex: 1 }}
        value={value}
        keyboardType={keyboardType ? keyboardType : 'default'}
        onChangeText={txt => {
          onChangeText(txt);
        }}
    />
    </View>
  );
};

export default CustomTextinput;
