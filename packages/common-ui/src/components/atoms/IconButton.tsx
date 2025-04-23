import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./IconButton.module.scss";
import { ButtonVariant, ButtonSize } from "./Button";

export interface IconButtonProps
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
   * 로딩 상태 표시 여부
   * @default false
   */
  isLoading?: boolean;

  /**
   * 아이콘 (React 노드)
   */
  icon: React.ReactNode;

  /**
   * 접근성을 위한 레이블 (스크린 리더용)
   */
  ariaLabel: string;

  /**
   * 버튼 모양 (square: 사각형, circle: 원형)
   * @default circle
   */
  shape?: "square" | "circle";

  /**
   * 버튼의 추가 클래스명
   */
  className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      ariaLabel,
      shape = "circle",
      className,
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const buttonClasses = classNames(
      styles.iconButton,
      styles[`button-${variant}`],
      styles[`button-${size}`],
      styles[`shape-${shape}`],
      {
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
        aria-label={ariaLabel}
        type={type}
        {...rest}
      >
        {isLoading ? (
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.spinner}
          >
            <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
          </svg>
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
