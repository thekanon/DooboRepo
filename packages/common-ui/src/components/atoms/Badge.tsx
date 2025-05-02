import React from "react";
import classNames from "classnames";
import styles from "./Badge.module.scss";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /**
   * 배지에 표시할 내용
   */
  children?: React.ReactNode;

  /**
   * 배지 변형
   * @default 'primary'
   */
  variant?: BadgeVariant;

  /**
   * 배지 크기
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * 배지를 원형으로 표시할지 여부
   * @default false
   */
  rounded?: boolean;

  /**
   * 배지의 추가 클래스명
   */
  className?: string;

  /**
   * 배지가 다른 요소에 오버레이되어 표시될 때, 배지 내용이 없는 상태
   * @default false
   */
  dot?: boolean;

  /**
   * 배지가 오버레이되는 대상 요소
   */
  content?: React.ReactNode;

  /**
   * 배지의 커스텀 최대값, count가 이 값을 초과하면 {max}+ 형태로 표시됩니다
   * @default 99
   */
  max?: number;

  /**
   * 배지에 표시할 숫자
   */
  count?: number;

  /**
   * 배지 오프셋 [x, y] 위치 조정
   */
  offset?: [number, number];

  /**
   * 특정 조건에 따라 배지를 표시할지 여부
   * @default true
   */
  show?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  className,
  dot = false,
  content,
  max = 99,
  count,
  offset,
  show = true,
}) => {
  const shouldShowBadge =
    show && (dot || (typeof count === "number" && count > 0) || children);

  // 오버레이 뱃지일 경우의 처리
  if (content) {
    return (
      <div className={styles.badgeWrapper}>
        {content}
        {shouldShowBadge && (
          <span
            className={classNames(
              styles.badge,
              styles[`badge-${variant}`],
              styles[`badge-${size}`],
              {
                [styles.rounded]: rounded,
                [styles.dot]: dot,
              },
              className
            )}
            style={
              offset
                ? { marginTop: offset[1], marginRight: offset[0] }
                : undefined
            }
          >
            {dot
              ? null
              : count !== undefined
                ? count > max
                  ? `${max}+`
                  : count
                : children}
          </span>
        )}
      </div>
    );
  }

  // 독립적인 배지일 경우
  return shouldShowBadge ? (
    <span
      className={classNames(
        styles.badge,
        styles[`badge-${variant}`],
        styles[`badge-${size}`],
        {
          [styles.rounded]: rounded,
          [styles.dot]: dot,
          [styles.standalone]: !content,
        },
        className
      )}
    >
      {dot
        ? null
        : count !== undefined
          ? count > max
            ? `${max}+`
            : count
          : children}
    </span>
  ) : null;
};
