// packages/common-ui/src/layouts/base/AuthLayout/AuthLayout.tsx
import React from "react";
import classNames from "classnames";
import styles from "./AuthLayout.module.scss";
import { Text } from "../../../components/atoms/Text";

export interface AuthLayoutProps {
  /**
   * 레이아웃 제목
   */
  title?: string;

  /**
   * 레이아웃 부제목 또는 설명
   */
  subtitle?: string;

  /**
   * 상단 로고 영역 컨텐츠
   */
  logo?: React.ReactNode;

  /**
   * 메인 컨텐츠
   */
  children: React.ReactNode;

  /**
   * 하단 푸터 컨텐츠
   */
  footer?: React.ReactNode;

  /**
   * 배경 이미지 URL
   */
  backgroundImage?: string;

  /**
   * 최대 컨텐츠 너비
   * @default '400px'
   */
  maxWidth?: string;

  /**
   * 내용을 가운데 정렬할지 여부
   * @default true
   */
  centered?: boolean;

  /**
   * 추가 클래스명
   */
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  logo,
  children,
  footer,
  backgroundImage,
  maxWidth = "400px",
  centered = true,
  className,
}) => {
  const layoutClasses = classNames(
    styles.authLayout,
    {
      [styles.centered]: centered,
    },
    className
  );

  const layoutStyle = {
    ...(backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}),
  };

  const contentStyle = {
    maxWidth,
  };

  return (
    <div className={layoutClasses} style={layoutStyle}>
      <div className={styles.content} style={contentStyle}>
        {logo && <div className={styles.logo}>{logo}</div>}

        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {subtitle && (
              <Text
                variant="body"
                color="secondary"
                className={styles.subtitle}
              >
                {subtitle}
              </Text>
            )}
          </div>
        )}

        <div className={styles.main}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default AuthLayout;
