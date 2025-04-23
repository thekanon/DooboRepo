import React from "react";
import classNames from "classnames";
import styles from "./Icon.module.scss";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "inherit";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * 아이콘의 SVG 경로 또는 요소들
   */
  children: React.ReactNode;

  /**
   * 아이콘 크기
   * @default 'md'
   */
  size?: IconSize;

  /**
   * 아이콘 색상
   * @default 'inherit'
   */
  color?: IconColor;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 뷰포트 크기 (viewBox)
   * @default '0 0 24 24'
   */
  viewBox?: string;

  /**
   * 접근성 레이블 (aria-label)
   */
  label?: string;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      children,
      size = "md",
      color = "inherit",
      className,
      viewBox = "0 0 24 24",
      label,
      ...rest
    },
    ref
  ) => {
    const iconClasses = classNames(
      styles.icon,
      styles[`icon-${size}`],
      styles[`icon-color-${color}`],
      className
    );

    return (
      <svg
        ref={ref}
        className={iconClasses}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        aria-label={label}
        role={label ? "img" : "presentation"}
        aria-hidden={!label}
        {...rest}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = "Icon";
