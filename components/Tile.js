import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Rating from './Rating';
import Typography from './Typography';

const { width } = Dimensions.get('window');

const Tile = props => {
  const { title, imageSrc, rating, caption } = props;
  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={imageSrc}
        resizeMode={'cover'}
        borderRadius={8}
      />
      <Typography variant={'caption'} color={'textSecondary'}>
        {caption}
      </Typography>
      <Typography variant={'title'}>{title}</Typography>
      <Rating votes={rating} size={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
    width: width / 2 - 30,
  },
  image: {
    width: '100%',
    height: 110,
    marginBottom: 8,
  },
});

export default Tile;
