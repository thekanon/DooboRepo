import React from "react";
import classNames from "classnames";
import { Card } from "../atoms/Card";
import { Icon } from "../atoms/Icon";
import styles from "./InfoBox.module.scss";
import { iconPaths } from "../../lib/icon";

export type InfoBoxVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export interface InfoBoxProps {
  /**
   * 정보 박스 타입 (스타일 변형)
   * @default "info"
   */
  variant?: InfoBoxVariant;

  /**
   * 정보 박스 제목
   */
  title?: React.ReactNode;

  /**
   * 정보 박스 내용
   */
  children: React.ReactNode;

  /**
   * 아이콘 표시 여부
   * @default true
   */
  showIcon?: boolean;

  /**
   * 기본 아이콘 대신 사용할 커스텀 아이콘
   */
  icon?: React.ReactNode;

  /**
   * 닫기 버튼 표시 여부
   * @default false
   */
  closable?: boolean;

  /**
   * 닫기 버튼 클릭 시 호출되는 함수
   */
  onClose?: () => void;

  /**
   * 정보 박스가 전체 너비를 차지할지 여부
   * @default true
   */
  fullWidth?: boolean;

  /**
   * 정보 박스 크기
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 테두리 표시 여부
   * @default true
   */
  bordered?: boolean;

  /**
   * 내용의 정렬 방식
   * @default "left"
   */
  align?: "left" | "center" | "right";

  /**
   * 정보 박스를 압축된 형태로 표시
   * @default false
   */
  compact?: boolean;

  /**
   * 추가 작업 버튼
   */
  actions?: React.ReactNode;
}

/**
 * InfoBox 컴포넌트는 사용자에게 정보, 성공, 경고, 오류 등의 메시지를 표시하는 데 사용됩니다.
 * 다양한 스타일 변형과 크기를 지원하며, 아이콘과 제목을 함께 표시할 수 있습니다.
 */
export const InfoBox: React.FC<InfoBoxProps> = ({
  variant = "info",
  title,
  children,
  showIcon = true,
  icon,
  closable = false,
  onClose,
  fullWidth = true,
  size = "md",
  className,
  bordered = true,
  align = "left",
  compact = false,
  actions,
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case "info":
        return "info-circle";
      case "success":
        return "check-circle";
      case "warning":
        return "exclamation-triangle";
      case "error":
        return "exclamation-circle";
      case "neutral":
        return "minus-circle";
      default:
        return "info-circle";
    }
  };

  // InfoBox에 적용할 스타일 객체 생성
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
  };

  return (
    <Card
      shadow={bordered ? "none" : "sm"}
      borderRadius={size === "sm" ? "md" : "lg"}
      padded={!compact}
      className={classNames(
        styles.infoBox,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        styles[`align-${align}`],
        {
          [styles.bordered]: bordered,
          [styles.compact]: compact,
        },
        className
      )}
      style={style}
    >
      <div className={styles.container}>
        {showIcon && (
          <div className={styles.iconContainer}>
            {icon || (
              <Icon size={size === "sm" ? "sm" : "md"} className={styles.icon}>
                {iconPaths[getDefaultIcon()]}
              </Icon>
            )}
          </div>
        )}

        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.message}>{children}</div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>

        {closable && (
          <div className={styles.closeButton} onClick={onClose}>
            <Icon size="sm">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
              />
            </Icon>
          </div>
        )}
      </div>
    </Card>
  );
};

InfoBox.displayName = "InfoBox";
