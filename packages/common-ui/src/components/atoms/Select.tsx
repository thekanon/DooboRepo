import React, { forwardRef, useId, useRef } from "react";
import classNames from "classnames";
import styles from "./Select.module.scss";

export interface SelectOption {
  /**
   * 옵션 값
   */
  value: string;
  /**
   * 화면에 표시될 텍스트
   */
  label: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

interface CustomSelectProps {
  /**
   * 셀렉트 레이블
   */
  label?: string;
  /**
   * 도움말 텍스트
   */
  helpText?: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 셀렉트 앞에 표시할 요소
   */
  prefix?: React.ReactNode;
  /**
   * 셀렉트 뒤에 표시할 요소
   */
  suffix?: React.ReactNode;
  /**
   * 셀렉트 크기
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /**
   * 전체 너비를 차지할지 여부
   * @default true
   */
  fullWidth?: boolean;
  /**
   * 선택 옵션 배열
   */
  options: SelectOption[];
  /**
   * 기본 플레이스홀더 텍스트
   */
  placeholder?: string;
}

export type SelectProps = CustomSelectProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "prefix">;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
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
      options,
      placeholder,
      value,
      defaultValue,
      onChange,
      id: externalId,
      ...rest
    },
    ref
  ) => {
    // 내부 ref 생성 (외부에서 ref가 제공되지 않은 경우 사용)
    const innerRef = useRef<HTMLSelectElement>(null);
    // 외부 ref와 내부 ref 결합
    const selectRef = (ref || innerRef) as React.RefObject<HTMLSelectElement>;

    // 고유 ID 생성 (외부에서 제공되지 않은 경우)
    const generatedId = useId();
    const id = externalId || `select-${generatedId}`;

    // 제어 컴포넌트인지 확인
    const isControlled = value !== undefined;

    // onChange 핸들러가 없는 경우 기본 핸들러 제공
    const handleChange = onChange || (() => {});

    const selectWrapperClasses = classNames(
      styles.selectWrapper,
      {
        [styles[`select-${size}`]]: size,
        [styles["full-width"]]: fullWidth,
        [styles.disabled]: disabled,
        [styles.error]: !!error,
      },
      className
    );

    // select 요소에 전달할 props
    const selectProps = isControlled
      ? { value, onChange: handleChange }
      : { defaultValue };

    // 컨테이너 클릭 시 셀렉트 박스 열기
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // 셀렉트 컨테이너 클릭 시 셀렉트 요소에 포커스
      if (!disabled && selectRef.current && e.target !== selectRef.current) {
        selectRef.current.focus();

        // 일부 브라우저에서는 focus만으로 드롭다운이 열리지 않을 수 있어
        // click 이벤트 시뮬레이션을 추가
        try {
          // MouseEvent 생성
          const clickEvent = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          });

          // 셀렉트 요소에 이벤트 발생
          selectRef.current.dispatchEvent(clickEvent);
        } catch (error) {
          // 이벤트 시뮬레이션이 실패하면 기본 동작 수행
          selectRef.current.click();
        }
      }
    };

    return (
      <div className={selectWrapperClasses}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={styles.selectContainer}
          onClick={handleContainerClick}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          {prefix && <div className={styles.prefix}>{prefix}</div>}
          <select
            ref={selectRef}
            id={id}
            className={styles.select}
            disabled={disabled}
            {...selectProps}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {suffix || (
            <div className={styles.arrow} aria-hidden="true">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
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

Select.displayName = "Select";
