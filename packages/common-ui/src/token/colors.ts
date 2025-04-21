// packages/common-ui/src/token/colors.ts
import type { Colors } from "./types";

const colors: Colors = {
  // 기본 색상
  primary: {
    50: "#e6f7ff",
    100: "#bae7ff",
    200: "#91d5ff",
    300: "#69c0ff",
    400: "#40a9ff",
    500: "#1890ff", // 기본 primary 색상
    600: "#096dd9",
    700: "#0050b3",
    800: "#003a8c",
    900: "#002766",
  },

  // 중립 색상
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  // 의미적 색상
  semantic: {
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      700: "#15803d",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      500: "#f59e0b",
      700: "#b45309",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      700: "#b91c1c",
    },
    info: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      700: "#1d4ed8",
    },
  },

  // 백오피스 특화 색상
  backoffice: {
    background: "#f8f9fa",
    sidebar: "#ffffff",
    header: "#ffffff",
    border: "#e5e7eb",
    highlight: "#ecfdf5",
  },
};
export default colors;
