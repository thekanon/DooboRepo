// packages/common-ui/src/components/atoms/Button.tsx
import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 색상 변형
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * 버튼의 크기
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * 버튼 내부 아이콘 (왼쪽)
   */
  leftIcon?: React.ReactNode;

  /**
   * 버튼 내부 아이콘 (오른쪽)
   */
  rightIcon?: React.ReactNode;

  /**
   * 버튼이 전체 너비를 차지해야 하는지 여부
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean;

  /**
   * 버튼 내용
   */
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      loading = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const buttonClasses = classNames(
      styles.button,
      styles[`button-${variant}`],
      styles[`button-${size}`],
      {
        [styles["button-full-width"]]: fullWidth,
        [styles["button-loading"]]: loading,
      },
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && <span className={styles.loader}></span>}
        {!loading && leftIcon && (
          <span className={styles.leftIcon}>{leftIcon}</span>
        )}
        <span className={styles.content}>{children}</span>
        {!loading && rightIcon && (
          <span className={styles.rightIcon}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
