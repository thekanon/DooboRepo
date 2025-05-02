import React from "react";
import classNames from "classnames";
import { Text } from "../../../components/atoms/Text";
import { SidebarSectionProps } from "./types";
import styles from "./Sidebar.module.scss";

interface SidebarSectionComponentProps extends SidebarSectionProps {
  /**
   * 사이드바가 접힘 상태인지 여부
   */
  isCollapsed?: boolean;
}

/**
 * 사이드바 섹션 컴포넌트
 *
 * 제목과 내용을 가진 사이드바의 구분 영역입니다.
 */
export const SidebarSection: React.FC<SidebarSectionComponentProps> = ({
  title,
  children,
  className,
  isCollapsed = false,
}) => {
  return (
    <div className={classNames(styles.sidebarSection, className)}>
      {title && (
        <div className={styles.sectionTitle}>
          <Text
            size="xs"
            weight="semibold"
            color="muted"
            transform="uppercase"
            className={styles.sectionTitleText}
          >
            {title}
          </Text>
        </div>
      )}
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
};

SidebarSection.displayName = "SidebarSection";
