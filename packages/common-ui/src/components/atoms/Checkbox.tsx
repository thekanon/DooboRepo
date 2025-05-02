import React, { forwardRef, useId } from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

interface CustomCheckboxProps {
  /**
   * 체크박스 레이블 텍스트
   */
  label?: string;
  /**
   * 체크박스 추가 설명
   */
  helpText?: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 체크박스 크기
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /**
   * 전체 너비를 차지할지 여부
   * @default false
   */
  fullWidth?: boolean;
}

export type CheckboxProps = CustomCheckboxProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helpText,
      error,
      size = "md",
      fullWidth = false,
      className,
      disabled,
      checked,
      onChange,
      defaultChecked,
      id: externalId,
      ...rest
    },
    ref
  ) => {
    // 고유 ID 생성 (외부에서 제공되지 않은 경우)
    const generatedId = useId();
    const id = externalId || `checkbox-${generatedId}`;

    const checkboxWrapperClasses = classNames(
      styles.checkboxWrapper,
      {
        [styles[`checkbox-${size}`]]: size,
        [styles["full-width"]]: fullWidth,
        [styles.disabled]: disabled,
        [styles.error]: !!error,
        [styles.checked]: checked,
      },
      className
    );

    // checked prop이 있지만 onChange가 없는 경우 기본 핸들러 제공
    const handleChange = onChange || (() => {});

    // checked와 defaultChecked 중 하나를 선택
    // checked가 있으면 제어 컴포넌트, 없으면 비제어 컴포넌트
    const inputProps =
      checked !== undefined
        ? { checked, onChange: handleChange }
        : { defaultChecked };

    // 체크마크 클릭 핸들러 - input 요소의 change 이벤트 호출
    const handleCheckmarkClick = () => {
      if (!disabled) {
        // 직접 input 요소를 클릭하는 것처럼 동작
        const inputElement = document.getElementById(id) as HTMLInputElement;
        if (inputElement) {
          inputElement.click();
        }
      }
    };

    return (
      <div className={checkboxWrapperClasses}>
        <div className={styles.inputContainer}>
          <input
            type="checkbox"
            ref={ref}
            id={id}
            className={styles.input}
            disabled={disabled}
            {...inputProps}
            {...rest}
          />
          {/* 체크마크에 클릭 이벤트 핸들러 추가 */}
          <span
            className={styles.checkmark}
            onClick={handleCheckmarkClick}
            aria-hidden="true"
          />
          {label && (
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          )}
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

Checkbox.displayName = "Checkbox";
