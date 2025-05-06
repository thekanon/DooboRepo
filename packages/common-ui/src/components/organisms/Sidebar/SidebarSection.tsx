// SidebarSection.tsx
import React from "react";
import classNames from "classnames";
import { Text } from "../../atoms/Text";
import styles from "./Sidebar.module.scss";

export interface SidebarSectionProps {
  /**
   * 섹션 제목
   */
  title?: React.ReactNode;

  /**
   * 섹션 내용
   */
  children: React.ReactNode;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 사이드바가 접힘 상태인지 여부
   */
  isCollapsed?: boolean;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  children,
  className,
  isCollapsed = false,
}) => {
  const sectionClasses = classNames(
    styles.section,
    {
      [styles.collapsed]: isCollapsed,
    },
    className
  );

  return (
    <div className={sectionClasses}>
      {title && !isCollapsed && (
        <div className={styles.sectionTitle}>
          <Text variant="overline" color="secondary" noMargin>
            {title}
          </Text>
        </div>
      )}
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
};

SidebarSection.displayName = "SidebarSection";
