import React from 'react';
import { StyleSheet, View } from 'react-native';

const Grid = props => {
  const { children } = props;
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Grid;
