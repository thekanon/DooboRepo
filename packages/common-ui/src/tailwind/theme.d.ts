// packages/common-ui/src/tailwind/theme.d.ts
import {
  Colors,
  Spacing,
  Typography,
  Shadows,
  BorderRadius,
  BorderWidth,
  Breakpoints,
  ZIndex,
} from "../token";

declare const themeConfig: {
  extend: {
    colors: Colors;
    spacing: Spacing;
    fontFamily: Typography["fontFamily"];
    fontSize: Typography["fontSize"];
    fontWeight: Typography["fontWeight"];
    lineHeight: Typography["lineHeight"];
    letterSpacing: Typography["letterSpacing"];
    boxShadow: Shadows;
    borderRadius: BorderRadius;
    borderWidth: BorderWidth;
    screens: Breakpoints;
    zIndex: ZIndex;
  };
};

export default themeConfig;
