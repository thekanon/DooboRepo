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
   * 표시할 내용
   */
  children: React.ReactNode;

  /**
   * 텍스트의 크기와 스타일을 결정하는 변형
   * @default "body1"
   */
  variant?: TextVariant;

  /**
   * 텍스트의 굵기
   * @default "normal"
   */
  weight?: TextWeight;

  /**
   * 텍스트의 색상
   * @default "inherit"
   */
  color?: TextColor;

  /**
   * 텍스트 정렬 방식
   * @default "left"
   */
  align?: TextAlign;

  /**
   * true일 경우, 텍스트에 취소선 스타일이 적용됨
   * @default false
   */
  strikethrough?: boolean;

  /**
   * true일 경우, 텍스트에 밑줄이 적용됨
   * @default false
   */
  underline?: boolean;

  /**
   * true일 경우, 텍스트가 기울임체로 표시됨
   * @default false
   */
  italic?: boolean;

  /**
   * true일 경우, 텍스트가 대문자로 표시됨
   * @default false
   */
  uppercase?: boolean;

  /**
   * 텍스트에 사용할 HTML 태그
   * 제공되지 않을 경우, variant에 따라 결정됨
   */
  as?: TextElement;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * true일 경우, 텍스트가 한 줄을 초과하면 생략 부호로 잘림
   * @default false
   */
  truncate?: boolean;

  /**
   * 생략 부호로 자르기 전의 최대 줄 수
   * truncate가 true이고 lines > 1인 경우에만 적용됨
   */
  lines?: number;

  /**
   * 텍스트의 수직 정렬 방식
   * @default "none"
   */
  verticalAlign?: "none" | "center";

  /**
   * true일 경우, 텍스트의 하단 여백이 제거됨
   * @default false
   */
  noMargin?: boolean;

  /**
   * HTML 요소에 대한 추가 속성
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
      verticalAlign = "none",
      strikethrough = false,
      underline = false,
      italic = false,
      uppercase = false,
      as,
      className,
      truncate = false,
      lines,
      noMargin = false,
      ...rest
    },
    ref
  ) => {
    // variant를 기반으로 적절한 HTML 요소 결정 (지정되지 않은 경우)
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
        [styles.verticalCenter]: verticalAlign === "center",
        [styles.noMargin]: noMargin,
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
