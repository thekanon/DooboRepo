import React from "react";
import classNames from "classnames";
import { FormFooterProps } from "./types";
import styles from "./Form.module.scss";
import { Button } from "../../atoms/Button";
import { Spinner } from "../../atoms/Spinner";

/**
 * FormFooter 컴포넌트
 *
 * 폼의 하단에 배치되어 저장, 취소 버튼 등의 액션을 포함하는 컴포넌트입니다.
 * 주로 Form 컴포넌트와 함께 사용됩니다.
 */
export const FormFooter: React.FC<FormFooterProps> = ({
  submitText = "저장",
  cancelText = "취소",
  onSubmit,
  onCancel,
  extraActions,
  isSubmitting = false,
  disabled = false,
  showCancel = true,
  className,
  align = "end",
  sticky = false,
  style,
}) => {
  // 푸터 클래스 이름 생성
  const footerClasses = classNames(
    styles.formFooter,
    styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
    {
      [styles.sticky]: sticky,
    },
    className
  );

  return (
    <div className={footerClasses} style={style}>
      {/* 왼쪽에 배치될 추가 액션 */}
      {align === "between" && extraActions && (
        <div className={styles.extraActions}>{extraActions}</div>
      )}

      {/* 버튼 그룹 */}
      <div className={styles.buttonGroup}>
        {/* 추가 액션이 왼쪽에 배치되지 않는 경우 여기에 표시 */}
        {align !== "between" && extraActions && extraActions}

        {/* 취소 버튼 */}
        {showCancel && onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting || disabled}
            type="button"
          >
            {cancelText}
          </Button>
        )}

        {/* 저장 버튼 */}
        {onSubmit && (
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={isSubmitting || disabled}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Spinner customClass="mr-2" />
                처리 중...
              </>
            ) : (
              submitText
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

FormFooter.displayName = "FormFooter";
