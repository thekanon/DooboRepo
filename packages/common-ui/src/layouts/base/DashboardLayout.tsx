// packages/common-ui/src/layouts/base/DashboardLayout.tsx
import React from "react";
import classNames from "classnames";
import styles from "./DashboardLayout.module.scss";

export interface DashboardLayoutProps {
  /**
   * 레이아웃 헤더 컨텐츠
   */
  header: React.ReactNode;

  /**
   * 레이아웃 사이드바 컨텐츠
   */
  sidebar: React.ReactNode;

  /**
   * 레이아웃 메인 컨텐츠
   */
  children: React.ReactNode;

  /**
   * 레이아웃 푸터 컨텐츠 (선택 사항)
   */
  footer?: React.ReactNode;

  /**
   * 사이드바 확장 여부
   * @default true
   */
  sidebarExpanded?: boolean;

  /**
   * 사이드바 너비 (확장 시)
   * @default '280px'
   */
  sidebarWidth?: string;

  /**
   * 사이드바 너비 (축소 시)
   * @default '80px'
   */
  sidebarCollapsedWidth?: string;

  /**
   * 사이드바 위치 (왼쪽/오른쪽)
   * @default 'left'
   */
  sidebarPosition?: "left" | "right";

  /**
   * 추가 클래스명
   */
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  header,
  sidebar,
  children,
  footer,
  sidebarExpanded = true,
  sidebarWidth = "280px",
  sidebarCollapsedWidth = "80px",
  sidebarPosition = "left",
  className,
}) => {
  const layoutClasses = classNames(
    styles.dashboardLayout,
    {
      [styles.sidebarRight]: sidebarPosition === "right",
      [styles.sidebarExpanded]: sidebarExpanded,
    },
    className
  );

  const currentSidebarWidth = sidebarExpanded
    ? sidebarWidth
    : sidebarCollapsedWidth;

  // CSS 변수를 이용하여 사이드바 너비를 동적으로 조정
  const layoutStyle = {
    "--sidebar-width": currentSidebarWidth,
  } as React.CSSProperties;

  return (
    <div className={layoutClasses} style={layoutStyle}>
      <header className={styles.header}>{header}</header>
      <div className={styles.body}>
        <aside className={styles.sidebar}>{sidebar}</aside>
        <main className={styles.main}>
          <div className={styles.content}>{children}</div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </main>
      </div>
    </div>
  );
};
