import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Heading.module.scss";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "base"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";
export type HeadingWeight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
export type HeadingAlign = "left" | "center" | "right";
export type HeadingColor = "default" | "primary" | "secondary" | "muted";

export interface HeadingProps {
  /**
   * 헤딩 레벨 (h1 - h6)
   * @default 2
   */
  level?: HeadingLevel;
  /**
   * 헤딩 크기
   * @default "xl" for h1, "lg" for h2, "md" for h3, "base" for h4-h6
   */
  size?: HeadingSize;
  /**
   * 글자 굵기
   * @default "bold" for h1-h2, "semibold" for h3-h4, "medium" for h5-h6
   */
  weight?: HeadingWeight;
  /**
   * 텍스트 정렬
   * @default "left"
   */
  align?: HeadingAlign;
  /**
   * 텍스트 색상
   * @default "default"
   */
  color?: HeadingColor;
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
}

/**
 * 헤딩 컴포넌트 - 페이지 제목, 섹션 제목 등에 사용됩니다.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      size,
      weight,
      align = "left",
      color = "default",
      gutterBottom = true,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    // 레벨에 따른 기본 크기와 굵기 설정
    const defaultSize = (): HeadingSize => {
      switch (level) {
        case 1:
          return "xl";
        case 2:
          return "lg";
        case 3:
          return "md";
        default:
          return "base";
      }
    };

    const defaultWeight = (): HeadingWeight => {
      if (level <= 2) return "bold";
      if (level <= 4) return "semibold";
      return "medium";
    };

    const headingClasses = classNames(
      styles.heading,
      styles[`size-${size || defaultSize()}`],
      styles[`weight-${weight || defaultWeight()}`],
      styles[`align-${align}`],
      styles[`color-${color}`],
      {
        [styles.gutterBottom]: gutterBottom,
      },
      className
    );

    const Component = `h${level}` as const;
    console.log("headingClasses", headingClasses);
    console.log(styles);

    return (
      <Component ref={ref} className={headingClasses} {...rest}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
