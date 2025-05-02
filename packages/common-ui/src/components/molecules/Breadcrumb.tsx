import React from "react";
import classNames from "classnames";
import styles from "./Breadcrumb.module.scss";

export interface BreadcrumbItem {
  /**
   * 아이템 표시 텍스트
   */
  label: string;

  /**
   * 아이템 링크 경로
   */
  href?: string;

  /**
   * 아이템 클릭 핸들러 (href 대신 사용 가능)
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * 아이템 활성 상태
   * @default false
   */
  active?: boolean;

  /**
   * 아이템 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 아이템 아이콘
   */
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  /**
   * Breadcrumb 아이템 목록
   */
  items: BreadcrumbItem[];

  /**
   * 구분자 문자 또는 요소
   * @default "/"
   */
  separator?: React.ReactNode;

  /**
   * 최대 표시 아이템 개수 (초과 시 '...' 표시)
   * @default undefined (모두 표시)
   */
  maxItems?: number;

  /**
   * 클래스 이름
   */
  className?: string;

  /**
   * 컴포넌트 태그
   * @default "nav"
   */
  as?: React.ElementType;

  /**
   * 인라인 스타일
   */
  style?: React.CSSProperties;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "/",
  maxItems,
  className,
  as: Component = "nav",
  style,
}) => {
  // 최대 표시 아이템 처리
  const displayItems = maxItems && items.length > maxItems
    ? [
        ...items.slice(0, 1),
        { label: "...", disabled: true },
        ...items.slice(items.length - (maxItems - 2)),
      ]
    : items;

  return (
    <Component
      className={classNames(styles.breadcrumb, className)}
      style={style}
      aria-label="breadcrumb"
    >
      <ol className={styles.list}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const itemClasses = classNames(styles.item, {
            [styles.active]: item.active || isLast,
            [styles.disabled]: item.disabled,
          });

          // 링크 또는 텍스트 요소 결정
          let itemContent;
          if (item.disabled || isLast) {
            itemContent = (
              <span className={styles.text}>
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                {item.label}
              </span>
            );
          } else {
            itemContent = item.href ? (
              <a
                href={item.href}
                className={styles.link}
                onClick={item.onClick}
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <button
                type="button"
                className={styles.button}
                onClick={item.onClick}
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                {item.label}
              </button>
            );
          }

          return (
            <li key={index} className={itemClasses}>
              {itemContent}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </Component>
  );
};

Breadcrumb.displayName = "Breadcrumb";