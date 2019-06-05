import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Button = props => {
  const { label, onPress, style } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={StyleSheet.flatten([styles.root, style && style])}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.175,
    shadowRadius: 6.68,
  },
  label: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});

export default Button;
