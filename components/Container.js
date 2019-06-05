import React from 'react';
import { StyleSheet, View } from 'react-native';

const Container = props => {
  const { children } = props;
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Container;
