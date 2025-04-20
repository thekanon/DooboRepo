// packages/common-ui/src/components/atoms/Input.tsx
import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

interface CustomInputProps {
  label?: string;
  helpText?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "sm" | "md" | "lg";
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
