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
  },
  title1: {
    fontWeight: fontWeights.regular,
    fontSize: 28,
    lineHeight: 34,
  },
  title2: {
    fontWeight: fontWeights.regular,
    fontSize: 22,
    lineHeight: 28,
  },
  title3: {
    fontWeight: fontWeights.regular,
    fontSize: 20,
    lineHeight: 25,
  },
  headline: {
    fontWeight: fontWeights.semiBold,
    fontSize: 17,
    lineHeight: 22,
  },
  body: {
    fontWeight: fontWeights.regular,
    fontSize: 17,
    lineHeight: 22,
  },
  callout: {
    fontWeight: fontWeights.regular,
    fontSize: 16,
    lineHeight: 21,
  },
  subhead: {
    fontWeight: fontWeights.regular,
    fontSize: 15,
    lineHeight: 20,
  },
  footnote: {
    fontWeight: fontWeights.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  caption1: {
    fontWeight: fontWeights.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  caption2: {
    fontWeight: fontWeights.regular,
    fontSize: 11,
    lineHeight: 13,
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
    'title1',
    'title2',
    'headline',
    'body',
    'callout',
    'subhead',
    'footnote',
    'caption1',
    'caption2',
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
