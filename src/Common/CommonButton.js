/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CommonButton = ({ onPress, title, bgcolor, textcolor, disable }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
      disabled={disable}
        style={{
          height: 50,
          width: '95%',
          marginTop: 30,
          backgroundColor: bgcolor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => {
          onPress();
        }}
      >
        <Text style={{ fontSize: 20, color: textcolor }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonButton;
