import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Paragraph.module.scss";

export type ParagraphSize = "xs" | "sm" | "base" | "lg" | "xl";
export type ParagraphWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold";
export type ParagraphAlign = "left" | "center" | "right" | "justify";
export type ParagraphColor = "default" | "primary" | "secondary" | "muted";
export type ParagraphLineHeight = "tight" | "normal" | "relaxed" | "loose";

export interface ParagraphProps {
  /**
   * 텍스트 크기
   * @default "base"
   */
  size?: ParagraphSize;
  /**
   * 글자 굵기
   * @default "normal"
   */
  weight?: ParagraphWeight;
  /**
   * 텍스트 정렬
   * @default "left"
   */
  align?: ParagraphAlign;
  /**
   * 텍스트 색상
   * @default "default"
   */
  color?: ParagraphColor;
  /**
   * 줄 간격
   * @default "normal"
   */
  lineHeight?: ParagraphLineHeight;
  /**
   * 하단 마진 추가 여부
   * @default true
   */
  gutterBottom?: boolean;
  /**
   * 기타 추가 클래스
   */
  className?: string;
  /**
   * 컴포넌트 내용
   */
  children: React.ReactNode;
  /**
   * 기타 HTML 속성
   */
  style?: React.CSSProperties;
}

/**
 * 문단 컴포넌트 - 본문 텍스트, 설명 등에 사용됩니다.
 */
export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      size = "base",
      weight = "normal",
      align = "left",
      color = "default",
      lineHeight = "normal",
      gutterBottom = true,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const paragraphClasses = classNames(
      styles.paragraph,
      styles[`size-${size}`],
      styles[`weight-${weight}`],
      styles[`align-${align}`],
      styles[`color-${color}`],
      styles[`line-height-${lineHeight}`],
      {
        [styles.gutterBottom]: gutterBottom,
      },
      className
    );

    return (
      <p ref={ref} className={paragraphClasses} {...rest}>
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";
