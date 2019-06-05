import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

import { capitalize } from '../config/helpers';
import colors from '../config/colors';

const fontWeights = {
  regular: '400',
  bold: '700',
  semiBold: '600',
};

const Typography = props => {
  const { style, variant, color, gutterBottom, ...other } = props;

  return (
    <Text
      style={StyleSheet.flatten([
        style && style,
        variant && styles[variant],
        color && styles[`color${capitalize(color)}`],
        gutterBottom && styles.gutterBottom,
      ])}
      {...other}
    />
  );
};

const styles = StyleSheet.create({
  largeTitle: {
    fontWeight: fontWeights.bold,
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.41,
  },
  headline: {
    fontWeight: fontWeights.bold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  title: {
    fontWeight: fontWeights.regular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  body: {
    fontWeight: fontWeights.regular,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  caption: {
    fontWeight: fontWeights.regular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  colorPrimary: {
    color: colors.primary,
  },
  colorSecondary: {
    color: colors.secondary,
  },
  colorTextPrimary: {
    color: colors.text.primary,
  },
  colorTextSecondary: {
    color: colors.text.secondary,
  },
  colorTextMuted: {
    color: colors.text.muted,
  },
  gutterBottom: {
    marginBottom: 8,
  },
});

Typography.propTypes = {
  gutterBottom: PropTypes.bool,

  variant: PropTypes.oneOf([
    'largeTitle',
    'headline',
    'title',
    'body',
    'caption',
  ]),

  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
    'textMuted',
  ]),
};

Typography.defaultProps = {
  variant: 'body',
  color: 'textPrimary',
  gutterBottom: false,
};

export default Typography;
