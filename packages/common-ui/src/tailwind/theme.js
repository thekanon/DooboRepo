// packages/common-ui/src/tailwind/theme.js
const tokens = require("../token");

module.exports = {
  extend: {
    colors: tokens.colors,
    spacing: tokens.spacing,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize,
    fontWeight: tokens.typography.fontWeight,
    lineHeight: tokens.typography.lineHeight,
    letterSpacing: tokens.typography.letterSpacing,
    boxShadow: tokens.shadows,
    borderRadius: tokens.borders.radius,
    borderWidth: tokens.borders.width,
    screens: tokens.breakpoints,
    zIndex: tokens.zIndex,
  },
};
