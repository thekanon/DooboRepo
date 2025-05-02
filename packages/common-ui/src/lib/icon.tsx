/* icons.ts */

import React from "react";

/**
 * variant → svg <path> 매핑
 * ───────────────────────── */
export const iconPaths = {
  /** i */
  "info-circle": (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  ),

  /** ✓ */
  "check-circle": (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  ),

  /** ! (triangle) */
  "exclamation-triangle": (
    <path d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-6h-2v4h2v-4z" />
  ),

  /** ! (circle) */
  "exclamation-circle": (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  ),

  /** – (neutral) */
  "minus-circle": (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
  ),
} as const;

export type IconKey = keyof typeof iconPaths;
