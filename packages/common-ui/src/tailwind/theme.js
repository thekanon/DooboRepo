// packages/common-ui/src/tailwind/theme.js
import {
  colors,
  spacing,
  typography,
  shadows,
  borders,
  breakpoints,
  zIndex,
} from "../token";

const themeConfig = {
  extend: {
    colors,
    spacing,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
    letterSpacing: typography.letterSpacing,
    boxShadow: shadows,
    borderRadius: borders.radius,
    borderWidth: borders.width,
    screens: breakpoints,
    zIndex,
  },
};

export default themeConfig;
