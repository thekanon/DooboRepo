/* Token 타입 선언 전용 */

// 색상
export type ColorScale =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
export type SemanticColorScale = 50 | 100 | 500 | 700;
export type ColorPalette = Record<ColorScale, string>;
export interface SemanticColors {
  success: Record<SemanticColorScale, string>;
  warning: Record<SemanticColorScale, string>;
  error: Record<SemanticColorScale, string>;
  info: Record<SemanticColorScale, string>;
}
export interface BackofficeColors {
  background: string;
  sidebar: string;
  header: string;
  border: string;
  highlight: string;
}
export interface Colors {
  primary: Record<ColorScale, string>;
  neutral: Record<ColorScale, string>;
  semantic: SemanticColors;
  backoffice: BackofficeColors;
}

/* --- Typography --- */
export type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";
export type FontWeight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
export type LineHeight =
  | "none"
  | "tight"
  | "snug"
  | "normal"
  | "relaxed"
  | "loose";
export type LetterSpacing =
  | "tighter"
  | "tight"
  | "normal"
  | "wide"
  | "wider"
  | "widest";
export interface Typography {
  fontFamily: { sans: string[]; mono: string[] };
  fontSize: Record<FontSize, string>;
  fontWeight: Record<FontWeight, string>;
  lineHeight: Record<LineHeight, string | number>;
  letterSpacing: Record<LetterSpacing, string>;
}

/* --- Shadows & Borders --- */
export type ShadowSize =
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "inner"
  | "none";
export type Shadows = Record<ShadowSize, string>;
export type BorderRadiusSize =
  | "none"
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";
export type BorderWidthSize = 0 | 1 | 2 | 4 | 8;
export interface BorderRadius {
  [k: string]: string;
}
export interface BorderWidth {
  [k: number]: string;
}
export interface BorderStyle {
  solid: string;
  dashed: string;
  dotted: string;
  double: string;
  none: string;
}
export interface Borders {
  radius: BorderRadius;
  width: BorderWidth;
  style: BorderStyle;
}

/* --- Breakpoints & Z‑index --- */
export type BreakpointSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type Breakpoints = Record<BreakpointSize, string>;
export interface ZIndex {
  hide: number;
  auto: string;
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;
  toast: number;
  tooltip: number;
}

/* --- Spacing --- */
export type SpacingKey =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96;
export type Spacing = Record<SpacingKey | string, string>;

/* --- 전체 Tokens --- */
export interface Tokens {
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
  shadows: Shadows;
  borders: Borders;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
}
