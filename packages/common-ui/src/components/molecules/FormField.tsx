import React from "react";
import classNames from "classnames";
import styles from "./FormField.module.scss";
import { Text } from "../atoms/Text";

export interface FormFieldProps {
  /**
   * 필드 레이블
   */
  label?: string;
  /**
   * 필드의 도움말 텍스트
   */
  helpText?: string;
  /**
   * 필드의 에러 메시지
   */
  error?: string;
  /**
   * 필수 필드 여부
   */
  required?: boolean;
  /**
   * 레이블 위치
   * @default "top"
   */
  labelPosition?: "top" | "side" | "inside";
  /**
   * 레이블 너비 (labelPosition이 "side"인 경우에만 적용)
   */
  labelWidth?: string;
  /**
   * 폼 필드 내부 콘텐츠
   */
  children: React.ReactNode;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  /**
   * 읽기 전용 상태
   */
  readOnly?: boolean;
  /**
   * 컴팩트 모드 (여백을 줄임)
   * @default false
   */
  compact?: boolean;
  /**
   * 인라인 스타일 객체
   */
  style?: React.CSSProperties;
  /**
   * 필드 이름 (폼 상태 관리에 사용)
   */
  name?: string;
}

// 자식 요소에 대한 props 타입 정의
interface ChildProps {
  id?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  error?: any;
  [key: string]: any;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  helpText,
  error,
  required = false,
  labelPosition = "top",
  labelWidth,
  children,
  className,
  disabled = false,
  readOnly = false,
  compact = false,
  style,
}) => {
  const formFieldClasses = classNames(
    styles.formField,
    {
      [styles[`label-${labelPosition}`]]: labelPosition,
      [styles.disabled]: disabled,
      [styles.readOnly]: readOnly,
      [styles.hasError]: !!error,
      [styles.required]: required,
      [styles.compact]: compact,
    },
    className
  );

  const labelStyle =
    labelPosition === "side" && labelWidth ? { width: labelWidth } : undefined;

  // 자식 요소에 id가 있는지 확인
  let childId: string | undefined;
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      typeof child.props === "object" &&
      child.props &&
      "id" in child.props
    ) {
      childId = (child.props as ChildProps).id;
    }
  });

  // 자식 요소에 에러와 비활성화 상태를 전달
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // props에 대한 타입 단언
      const originalProps = child.props as ChildProps;

      // 객체 타입 체크 후 스프레드 연산자 사용
      const childProps: ChildProps = {
        ...originalProps,
        disabled:
          disabled ||
          (typeof originalProps === "object" && originalProps.disabled),
        "aria-invalid":
          !!error ||
          (typeof originalProps === "object" && originalProps["aria-invalid"]),
        "aria-describedby": error && childId ? `${childId}-error` : undefined,
      };

      // 에러 메시지는 FormField에서만 표시하기 위해 전달하지 않음
      if (typeof childProps === "object") {
        delete childProps.error;
      }

      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return (
    <div className={formFieldClasses} style={style}>
      {label && (
        <label className={styles.label} htmlFor={childId} style={labelStyle}>
          <Text
            variant="label"
            color={error ? "error" : disabled ? "disabled" : "default"}
          >
            {label}
            {required && <span className={styles.requiredMark}>*</span>}
          </Text>
        </label>
      )}
      <div className={styles.fieldContent}>
        {enhancedChildren}
        {(helpText || error) && (
          <div
            className={styles.feedback}
            id={error && childId ? `${childId}-error` : undefined}
          >
            <Text variant="caption" color={error ? "error" : "secondary"}>
              {error || helpText}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

FormField.displayName = "FormField";
