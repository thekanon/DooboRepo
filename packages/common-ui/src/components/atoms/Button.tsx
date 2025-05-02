import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 변형
   * @default primary
   */
  variant?: ButtonVariant;

  /**
   * 버튼 크기
   * @default md
   */
  size?: ButtonSize;

  /**
   * 버튼의 전체 너비 적용 여부
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 버튼 로딩 상태 표시 여부
   * @default false
   */
  isLoading?: boolean;

  /**
   * 버튼의 추가 클래스명
   */
  className?: string;

  /**
   * 버튼 내용
   */
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      className,
      disabled,
      children,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const buttonClasses = classNames(
      styles.button,
      styles[`button-${variant}`],
      styles[`button-${size}`],
      {
        [styles["full-width"]]: fullWidth,
        [styles.loading]: isLoading,
        [styles.disabled]: disabled || isLoading,
      },
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        type={type}
        {...rest}
      >
        {isLoading && (
          <span className={styles.loadingIndicator}>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.spinner}
            >
              <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
            </svg>
          </span>
        )}
        <span className={isLoading ? styles.loadingText : undefined}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
