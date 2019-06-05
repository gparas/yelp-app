import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import Typography from './Typography';

export default class Rating extends Component {
  get stars() {
    const { votes, size } = this.props;
    const starsNumber = parseInt(votes);
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        <Icon.Ionicons
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
          {votes ? (
            <Typography color={'textSecondary'} style={{ marginLeft: 3 }}>
              {votes}
            </Typography>
          ) : null}
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
});
