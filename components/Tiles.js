import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Rating from './Rating';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

const Tiles = props => {
  const { title, source, rating, caption } = props;
  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={source}
        resizeMode={'cover'}
        borderRadius={8}
      />
      <Text style={styles.caption}>{caption}</Text>
      <Text style={styles.title}>{title}</Text>
      <Rating votes={rating} size={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
    width: width / 2 - 30,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  image: {
    width: '100%',
    height: 110,
    marginBottom: 8,
  },
});

export default Tiles;
