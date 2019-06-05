import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default class Rating extends Component {
  get stars() {
    const { votes, size } = this.props;
    const starsNumber = parseInt(votes);
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        <Ionicons
          key={`star-${i}`}
          name='md-star'
          size={size}
          color={starsNumber > i ? colors.activeStar : colors.defaultStar}
          style={styles.star}
        />
      );
    }
    return starElements;
  }

  render() {
    const { votes } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.stars}>
          {this.stars}
          {votes ? <Text style={styles.votesNumber}>{votes}</Text> : null}
        </View>
      </View>
    );
  }
}

Rating.propTypes = {
  votes: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 1,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  votesNumber: {
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 3,
    color: colors.textLight,
  },
});
