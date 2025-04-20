// packages/common-ui/src/components/atoms/Card.tsx
import React from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";

export interface CardProps {
  /**
   * 카드 내용
   */
  children: React.ReactNode;

  /**
   * 카드 제목
   */
  title?: React.ReactNode;

  /**
   * 제목 오른쪽에 표시될 액션 버튼이나 아이콘
   */
  headerActions?: React.ReactNode;

  /**
   * 카드 하단에 표시될 푸터 컨텐츠
   */
  footer?: React.ReactNode;

  /**
   * 카드 패딩 사용 여부
   * @default true
   */
  padded?: boolean;

  /**
   * 그림자 크기
   * @default 'md'
   */
  shadow?: "none" | "sm" | "md" | "lg";

  /**
   * 테두리 반경 크기
   * @default 'lg'
   */
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl";

  /**
   * 추가 클래스
   */
  className?: string;

  /**
   * 카드에 적용할 스타일
   */
  style?: React.CSSProperties;

  /**
   * 전체 카드를 클릭 가능하게 만들지 여부
   * @default false
   */
  clickable?: boolean;

  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  headerActions,
  footer,
  padded = true,
  shadow = "md",
  borderRadius = "lg",
  className,
  style,
  clickable = false,
  onClick,
}) => {
  const cardClasses = classNames(
    styles.card,
    {
      [styles[`shadow-${shadow}`]]: shadow !== "none",
      [styles[`radius-${borderRadius}`]]: borderRadius !== "none",
      [styles.padded]: padded,
      [styles.clickable]: clickable,
    },
    className
  );

  return (
    <div
      className={cardClasses}
      style={style}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {(title || headerActions) && (
        <div className={styles.header}>
          {title && <div className={styles.title}>{title}</div>}
          {headerActions && (
            <div className={styles.actions}>{headerActions}</div>
          )}
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};
