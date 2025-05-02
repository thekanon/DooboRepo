import React from "react";
import classNames from "classnames";
import { Avatar } from "../../../components/atoms/Avatar";
import { Text } from "../../../components/atoms/Text";
import { DropdownMenu } from "../../../components/molecules/DropdownMenu";
import { IconButton } from "../../../components/atoms/IconButton";
import { SidebarFooterProps } from "./types";
import styles from "./Sidebar.module.scss";

interface SidebarFooterComponentProps extends SidebarFooterProps {
  /**
   * 사용자 프로필 정보
   */
  userProfile?: {
    name: string;
    role?: string;
    avatar?: string | React.ReactNode;
    email?: string;
  };
}

/**
 * 사이드바 푸터 컴포넌트
 *
 * 사용자 프로필 정보와 설정 메뉴를 포함하는 사이드바 하단 영역입니다.
 */
export const SidebarFooter: React.FC<SidebarFooterComponentProps> = ({
  children,
  className,
  isCollapsed = false,
  userProfile,
}) => {
  // 사용자 프로필이 없고 자식 요소도 없으면 렌더링하지 않음
  if (!userProfile && !children) {
    return null;
  }

  return (
    <div className={classNames(styles.sidebarFooter, className)}>
      {userProfile && (
        <DropdownMenu
          trigger={
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                {typeof userProfile.avatar === "string" ? (
                  <Avatar
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    size="md"
                  />
                ) : userProfile.avatar ? (
                  userProfile.avatar
                ) : (
                  <Avatar alt={userProfile.name} size="md" />
                )}
              </div>

              {!isCollapsed && (
                <div className={styles.userInfo}>
                  <div className={styles.userName}>
                    <Text size="sm" weight="medium">
                      {userProfile.name}
                    </Text>
                  </div>

                  {userProfile.role && (
                    <div className={styles.userRole}>
                      <Text size="xs" color="muted">
                        {userProfile.role}
                      </Text>
                    </div>
                  )}
                </div>
              )}

              {!isCollapsed && (
                <IconButton
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  }
                  ariaLabel="사용자 메뉴"
                  variant="ghost"
                  size="sm"
                />
              )}
            </div>
          }
          menuClassName={styles.userMenu}
          position="top"
          horizontalAlign="center"
        >
          <div className={styles.userMenuHeader}>
            <Text size="sm" weight="semibold">
              {userProfile.name}
            </Text>
            {userProfile.email && (
              <Text size="xs" color="muted">
                {userProfile.email}
              </Text>
            )}
          </div>

          <div className={styles.userMenuItems}>
            <a href="/profile" className={styles.userMenuItem}>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>프로필</span>
            </a>

            <a href="/settings" className={styles.userMenuItem}>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>설정</span>
            </a>

            <a href="/logout" className={styles.userMenuItem}>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>로그아웃</span>
            </a>
          </div>
        </DropdownMenu>
      )}

      {children}
    </div>
  );
};

SidebarFooter.displayName = "SidebarFooter";
