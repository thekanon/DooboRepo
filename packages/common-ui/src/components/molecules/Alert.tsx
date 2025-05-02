// Alert.tsx - 최종 수정버전

import React from "react";
import classNames from "classnames";
import { Icon } from "../atoms/Icon";
import styles from "./Alert.module.scss";
import { iconPaths } from "../../lib/icon";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps {
  /**
   * 알림의 타입을 정의합니다
   * @default "info"
   */
  variant?: AlertVariant;

  /**
   * 알림의 크기를 정의합니다
   * @default "md"
   */
  size?: AlertSize;

  /**
   * 알림의 제목을 정의합니다
   */
  title?: React.ReactNode;

  /**
   * 알림의 내용을 정의합니다
   */
  children: React.ReactNode;

  /**
   * 알림이 닫히는 이벤트 핸들러를 정의합니다
   * 제공되지 않으면 닫기 버튼이 표시되지 않습니다
   */
  onClose?: () => void;

  /**
   * 아이콘을 표시할지 여부를 정의합니다
   * @default true
   */
  showIcon?: boolean;

  /**
   * 추가 CSS 클래스를 정의합니다
   */
  className?: string;

  /**
   * 알림의 액션 버튼을 정의합니다
   */
  action?: React.ReactNode;

  /**
   * 알림이 차지하는 너비를 정의합니다
   * @default false
   */
  fullWidth?: boolean;
}

export const Alert = ({
  variant = "info",
  size = "md",
  title,
  children,
  onClose,
  showIcon = true,
  className,
  action,
  fullWidth = false,
}: AlertProps) => {
  const getIcon = () => {
    switch (variant) {
      case "info":
        return "info-circle";
      case "success":
        return "check-circle";
      case "warning":
        return "exclamation-triangle";
      case "error":
        return "exclamation-circle";
      default:
        return "info-circle";
    }
  };

  const alertClasses = classNames(
    styles.alert,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    {
      [styles.fullWidth]: fullWidth,
    },
    className
  );

  return (
    <div role="alert" className={alertClasses}>
      {showIcon && (
        <div className={styles.iconContainer}>
          <Icon size={size} color={variant} className={styles.icon}>
            {iconPaths[getIcon()]}
          </Icon>
        </div>
      )}

      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message}>{children}</div>
        {action && <div className={styles.action}>{action}</div>}
      </div>

      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close alert"
        >
          <Icon size="sm">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </Icon>
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";
