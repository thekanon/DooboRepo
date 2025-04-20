/* 런타임 토큰 + 타입 재‑export */

export { default as colors } from "./colors";
export { default as spacing } from "./spacing";
export { default as typography } from "./typography";
export { default as shadows } from "./shadows";
export { default as borders } from "./borders";
export { default as breakpoints } from "./breakpoints";
export { default as zIndex } from "./z-index";

import colors from "./colors";
import spacing from "./spacing";
import typography from "./typography";
import shadows from "./shadows";
import borders from "./borders";
import breakpoints from "./breakpoints";
import zIndex from "./z-index";

export const tokens = {
  colors,
  spacing,
  typography,
  shadows,
  borders,
  breakpoints,
  zIndex,
} as const;

export type {
  Colors,
  Spacing,
  Typography,
  Shadows,
  BorderRadius,
  BorderWidth,
  Breakpoints,
  ZIndex,
} from "./types";
export default tokens;
