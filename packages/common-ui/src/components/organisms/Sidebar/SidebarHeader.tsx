import React from "react";
import classNames from "classnames";
import { Heading } from "../../../components/atoms/Heading";
import { IconButton } from "../../../components/atoms/IconButton";
import { SidebarHeaderProps } from "./types";
import styles from "./Sidebar.module.scss";

/**
 * 사이드바 헤더 컴포넌트
 *
 * 로고, 타이틀 및 접기/펼치기 버튼을 포함하는 사이드바 상단 영역입니다.
 */
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  logo,
  title,
  children,
  className,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  return (
    <div className={classNames(styles.sidebarHeader, className)}>
      <div className={styles.logoContainer}>
        {logo && <div className={styles.logoIcon}>{logo}</div>}

        {title && !isCollapsed && (
          <div className={styles.logoTitle}>
            <Heading level={4} size="sm">
              {title}
            </Heading>
          </div>
        )}
      </div>

      {children}

      {onToggleCollapse && (
        <div className={styles.toggleButton}>
          <IconButton
            icon={
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isCollapsed ? (
                  <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                ) : (
                  <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                )}
              </svg>
            }
            ariaLabel={isCollapsed ? "펼치기" : "접기"}
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
          />
        </div>
      )}
    </div>
  );
};

SidebarHeader.displayName = "SidebarHeader";
