import React, { forwardRef, useId } from "react";
import classNames from "classnames";
import styles from "./Radio.module.scss";

interface CustomRadioProps {
  /**
   * 라디오 버튼 레이블 텍스트
   */
  label?: string;
  /**
   * 라디오 버튼 추가 설명
   */
  helpText?: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 라디오 버튼 크기
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /**
   * 전체 너비를 차지할지 여부
   * @default false
   */
  fullWidth?: boolean;
}

export type RadioProps = CustomRadioProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
      id: externalId,
      ...rest
    },
    ref
  ) => {
    // 고유 ID 생성 (외부에서 제공되지 않은 경우)
    const generatedId = useId();
    const id = externalId || `radio-${generatedId}`;

    const radioWrapperClasses = classNames(
      styles.radioWrapper,
      {
        [styles[`radio-${size}`]]: size,
        [styles["full-width"]]: fullWidth,
        [styles.disabled]: disabled,
        [styles.error]: !!error,
        [styles.checked]: checked,
      },
      className
    );

    // onChange 핸들러가 없는 경우 기본 핸들러 제공
    const handleChange = onChange || (() => {});

    // 라디오마크 클릭 핸들러 - input 요소의 change 이벤트 호출
    const handleRadiomarkClick = () => {
      if (!disabled) {
        // 직접 input 요소를 클릭하는 것처럼 동작
        const inputElement = document.getElementById(id) as HTMLInputElement;
        if (inputElement) {
          inputElement.click();
        }
      }
    };

    return (
      <div className={radioWrapperClasses}>
        <div className={styles.inputContainer}>
          <input
            type="radio"
            ref={ref}
            id={id}
            className={styles.input}
            disabled={disabled}
            checked={checked}
            onChange={handleChange}
            {...rest}
          />
          <span
            className={styles.radiomark}
            onClick={handleRadiomarkClick}
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

Radio.displayName = "Radio";
