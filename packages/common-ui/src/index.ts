// ===================================
// 🎨  Design Tokens & Theme
// ===================================

// 1) 먼저 로컬로 import
import { tokens } from "./token";

// 2) 외부에도 그대로 다시 export
export { tokens };
export { default as themeConfig } from "./tailwind/theme";

// 개별 토큰 값
export { default as colors } from "./token/colors";
export const spacing = tokens.spacing;
export const typography = tokens.typography;
export const shadows = tokens.shadows;
export const borders = tokens.borders;
export const breakpoints = tokens.breakpoints;
export const zIndex = tokens.zIndex;

// 토큰 타입
export type {
  ColorScale,
  SemanticColorScale,
  ColorPalette,
  SemanticColors,
  BackofficeColors,
  Colors,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  Typography,
  ShadowSize,
  Shadows,
  BorderRadiusSize,
  BorderWidthSize,
  BorderRadius,
  BorderWidth,
  BorderStyle,
  Borders,
  BreakpointSize,
  Breakpoints,
  ZIndex,
  SpacingKey,
  Spacing,
  Tokens,
} from "./token/types";

// ===================================
// 🧱  Atom Components
// ===================================
export { Button } from "./components/atoms/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/atoms/Button";

export { Card } from "./components/atoms/Card";
export type { CardProps } from "./components/atoms/Card";

export { Input } from "./components/atoms/Input";
export type { InputProps } from "./components/atoms/Input";

export { Text } from "./components/atoms/Text";
export type {
  TextProps,
  TextVariant,
  TextWeight,
  TextAlign,
  TextColor,
  TextElement,
} from "./components/atoms/Text";

export { Heading } from "./components/atoms/Heading";
export type {
  HeadingProps,
  HeadingLevel,
  HeadingSize,
  HeadingWeight,
  HeadingAlign,
  HeadingColor,
} from "./components/atoms/Heading";

export { Paragraph } from "./components/atoms/Paragraph";
export type {
  ParagraphProps,
  ParagraphSize,
  ParagraphWeight,
  ParagraphAlign,
  ParagraphColor,
  ParagraphLineHeight,
} from "./components/atoms/Paragraph";

// ===================================
// 🧩  Layout Components
// ===================================
export { DashboardLayout } from "./layouts/base/DashboardLayout";
export type { DashboardLayoutProps } from "./layouts/base/DashboardLayout";

export { DataTableLayout } from "./layouts/page/DataTableLayout";
export type { DataTableLayoutProps } from "./layouts/page/DataTableLayout";

// ===================================
// ♻️  Legacy Compatibility
// ===================================
export { Button as LegacyButton } from "./button";
