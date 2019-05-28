export const colors = {
  TextPrimary: '#000000',
  TextSecondary: '#8A8A8F',
};

const typeSizes = [34, 28, 22, 20, 17, 16, 15, 13, 12, 11];

export const spacing = 16;

const fontFamilies = {
  display: 'Helvetica',
  body: 'Georgia',
};

const fontWeights = {
  regular: '400',
  bold: '700',
  semiBold: '600',
};

export const fonts = {
  'Large Title': {
    color: colors.TextPrimary,
    fontWeight: fontWeights.bold,
    fontSize: typeSizes[0],
    lineHeight: 41,
  },
  'Title 1': {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[1],
    lineHeight: 34,
  },
  'Title 2': {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[2],
    lineHeight: 28,
  },
  'Title 3': {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[3],
    lineHeight: 25,
  },
  Headline: {
    color: colors.TextPrimary,
    fontWeight: fontWeights.semiBold,
    fontSize: typeSizes[4],
    lineHeight: 22,
  },
  Body: {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[4],
    lineHeight: 22,
  },
  Callout: {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[5],
    lineHeight: 21,
  },
  Subhead: {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[6],
    lineHeight: 20,
  },
  Footnote: {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[7],
    lineHeight: 18,
  },
  'Caption 1': {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[8],
    lineHeight: 16,
  },
  'Caption 2': {
    color: colors.TextPrimary,
    fontWeight: fontWeights.regular,
    fontSize: typeSizes[9],
    lineHeight: 13,
  },
};

export default {
  fonts,
  spacing,
};
