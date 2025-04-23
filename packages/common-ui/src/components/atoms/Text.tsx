import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Text.module.scss";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

export type TextWeight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

export type TextAlign = "left" | "center" | "right" | "justify";

export type TextColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "inherit";

export type TextElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

export interface TextProps {
  /**
   * The content to be displayed
   */
  children: React.ReactNode;

  /**
   * The variant of the text which determines its size and style
   * @default "body1"
   */
  variant?: TextVariant;

  /**
   * The font weight of the text
   * @default "normal"
   */
  weight?: TextWeight;

  /**
   * The color of the text
   * @default "inherit"
   */
  color?: TextColor;

  /**
   * Text alignment
   * @default "left"
   */
  align?: TextAlign;

  /**
   * If true, the text will have a line-through style
   * @default false
   */
  strikethrough?: boolean;

  /**
   * If true, the text will be underlined
   * @default false
   */
  underline?: boolean;

  /**
   * If true, the text will be italic
   * @default false
   */
  italic?: boolean;

  /**
   * If true, the text will be displayed in uppercase
   * @default false
   */
  uppercase?: boolean;

  /**
   * HTML tag to be used for the text
   * If not provided, it will be determined based on the variant
   */
  as?: TextElement;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * If true, text will be truncated with ellipsis if it exceeds one line
   * @default false
   */
  truncate?: boolean;

  /**
   * Maximum number of lines before truncating with ellipsis
   * Only applied if truncate is true and lines > 1
   */
  lines?: number;

  /**
   * Additional props for the HTML element
   */
  [key: string]: any;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      variant = "body1",
      weight = "normal",
      color = "inherit",
      align = "left",
      strikethrough = false,
      underline = false,
      italic = false,
      uppercase = false,
      as,
      className,
      truncate = false,
      lines,
      ...rest
    },
    ref
  ) => {
    // Determine the appropriate HTML element based on variant if not specified
    const getDefaultElement = (): TextElement => {
      if (variant.startsWith("h")) {
        return variant as TextElement;
      }

      switch (variant) {
        case "subtitle1":
        case "subtitle2":
          return "h6";
        case "body1":
        case "body2":
          return "p";
        case "caption":
        case "overline":
          return "span";
        default:
          return "p";
      }
    };

    const Element = as || getDefaultElement();

    const textClasses = classNames(
      styles.text,
      styles[`variant-${variant}`],
      styles[`weight-${weight}`],
      styles[`color-${color}`],
      styles[`align-${align}`],
      {
        [styles.strikethrough]: strikethrough,
        [styles.underline]: underline,
        [styles.italic]: italic,
        [styles.uppercase]: uppercase,
        [styles.truncate]: truncate && !lines,
        [styles.multiLineTruncate]: truncate && lines && lines > 1,
      },
      className
    );

    const styleProps =
      truncate && lines && lines > 1
        ? { style: { WebkitLineClamp: lines } }
        : {};

    return React.createElement(
      Element,
      {
        className: textClasses,
        ref,
        ...styleProps,
        ...rest,
      },
      children
    );
  }
);

Text.displayName = "Text";
