import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

interface CustomInputProps {
  /**
   * 입력 필드의 레이블
   */
  label?: string;
  /**
   * 입력 필드의 도움말 텍스트
   */
  helpText?: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 입력 필드 앞에 표시할 요소
   */
  prefix?: React.ReactNode;
  /**
   * 입력 필드 뒤에 표시할 요소
   */
  suffix?: React.ReactNode;
  /**
   * 입력 필드 크기
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /**
   * 전체 너비를 차지할지 여부
   * @default true
   */
  fullWidth?: boolean;
}

export type InputProps = CustomInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      prefix,
      suffix,
      size = "md",
      fullWidth = true,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const inputWrapperClasses = classNames(
      styles.inputWrapper,
      {
        [styles[`input-${size}`]]: size,
        [styles["full-width"]]: fullWidth,
        [styles.disabled]: disabled,
        [styles.error]: !!error,
      },
      className
    );

    return (
      <div className={inputWrapperClasses}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputContainer}>
          {prefix && <div className={styles.prefix}>{prefix}</div>}
          <input
            ref={ref}
            className={styles.input}
            disabled={disabled}
            {...rest}
          />
          {suffix && <div className={styles.suffix}>{suffix}</div>}
        </div>
        {(helpText || error) && (
          <div className={error ? styles.errorMessage : styles.helpText}>
            {error || helpText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
