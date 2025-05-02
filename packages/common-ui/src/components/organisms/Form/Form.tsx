import React, {
  forwardRef,
  useCallback,
  useMemo,
  FormEvent,
  isValidElement,
  cloneElement,
} from "react";
import classNames from "classnames";
import { FormProps, FormSubmitEvent } from "./types";
import styles from "./Form.module.scss";
import { Alert } from "../../molecules/Alert";

/**
 * Form 컴포넌트
 *
 * 다양한 레이아웃 옵션을 지원하는 폼 컴포넌트입니다.
 * 기존 FormField, Input 등의 컴포넌트와 함께 사용하도록 설계되었습니다.
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      layout = "vertical",
      size = "md",
      children,
      className,
      onSubmit,
      isSubmitting = false,
      isDirty = false,
      isValid = true,
      validationStatus,
      initialValues,
      errorMessagePlacement = "field",
      labelWidth,
      fieldWidth,
      fullWidth = true,
      spacing = "md",
      align = "start",
      disabled = false,
      readOnly = false,
      fieldDefaults,
      bordered = false,
      successMessage,
      errorMessage,
      ...restProps
    },
    ref
  ) => {
    // 폼 레이아웃 클래스 생성
    const formClasses = classNames(
      styles.form,
      styles[layout],
      styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
      styles[`spacing${spacing.charAt(0).toUpperCase() + spacing.slice(1)}`],
      styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
      {
        [styles.fullWidth]: fullWidth,
        [styles.bordered]: bordered,
        [styles.disabled]: disabled,
      },
      className
    );

    // 레이블 너비 스타일 계산
    const labelStyle = useMemo(() => {
      if (layout === "horizontal" && labelWidth) {
        return {
          width:
            typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
        };
      }
      return undefined;
    }, [layout, labelWidth]);

    // 필드 너비 스타일 계산
    const fieldStyle = useMemo(() => {
      if (fieldWidth) {
        return {
          width:
            typeof fieldWidth === "number" ? `${fieldWidth}px` : fieldWidth,
        };
      }
      return undefined;
    }, [fieldWidth]);

    // 폼 제출 핸들러
    const handleSubmit = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        if (onSubmit) {
          const values = initialValues || {};

          // FormSubmitEvent 객체 생성
          const submitEvent: FormSubmitEvent = {
            preventDefault: () => event.preventDefault(),
            stopPropagation: () => event.stopPropagation(),
            values,
            originalEvent: event,
          };

          // 기본 제출 동작 방지
          event.preventDefault();

          // onSubmit 콜백 호출
          onSubmit(submitEvent);
        }
      },
      [onSubmit, initialValues]
    );

    // 유효성 검증 오류가 있는 경우 오류 목록 표시
    const renderValidationErrors = () => {
      if (
        validationStatus &&
        !validationStatus.isValid &&
        validationStatus.errorMessages.length > 0 &&
        (errorMessagePlacement === "summary" ||
          errorMessagePlacement === "both")
      ) {
        return (
          <div className={styles.validationSummary}>
            <strong>다음 오류를 확인하세요:</strong>
            <ul>
              {validationStatus.errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        );
      }
      return null;
    };

    // 성공 또는 오류 메시지 표시
    const renderMessage = () => {
      if (successMessage) {
        return (
          <Alert variant="success" title="성공" className="mb-4">
            {successMessage}
          </Alert>
        );
      }

      if (errorMessage) {
        return (
          <Alert variant="error" title="오류" className="mb-4">
            {errorMessage}
          </Alert>
        );
      }

      return null;
    };

    // 자식 컴포넌트에 props 전달
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      // FormField 컴포넌트에 props 전달
      if (child.type && (child.type as any).displayName === "FormField") {
        return cloneElement(child, {
          ...fieldDefaults,
          labelPosition: layout === "horizontal" ? "side" : "top",
          labelWidth: layout === "horizontal" ? labelStyle : undefined,
          disabled: disabled || child.props.disabled,
          readOnly: readOnly || child.props.readOnly,
          size: child.props.size || size,
          error: validationStatus?.errors?.[child.props.name]?.[0],
          ...child.props,
        });
      }

      return child;
    });

    return (
      <form
        ref={ref}
        className={formClasses}
        onSubmit={handleSubmit}
        noValidate
        {...restProps}
      >
        {renderMessage()}
        {renderValidationErrors()}
        {enhancedChildren}
      </form>
    );
  }
);

Form.displayName = "Form";
