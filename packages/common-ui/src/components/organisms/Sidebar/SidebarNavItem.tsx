"use client";
import React, { useState, useCallback } from "react";
import classNames from "classnames";
import { Text } from "../../../components/atoms/Text";
import { Badge } from "../../../components/atoms/Badge";
import { Icon } from "../../../components/atoms/Icon";
import { SidebarNavItemProps } from "./types";
import styles from "./Sidebar.module.scss";

interface SidebarNavItemComponentProps extends SidebarNavItemProps {
  /**
   * 사이드바가 접힘 상태인지 여부
   */
  isCollapsed?: boolean;

  /**
   * 아이템 깊이 (중첩 메뉴에서 사용)
   */
  depth?: number;
}

/**
 * 사이드바 네비게이션 아이템 컴포넌트
 *
 * 아이콘, 라벨, 뱃지 및 하위 메뉴를 지원하는 네비게이션 아이템입니다.
 */
export const SidebarNavItem: React.FC<SidebarNavItemComponentProps> = ({
  id,
  label,
  href,
  icon,
  badge,
  isActive = false,
  disabled = false,
  onClick,
  children,
  isOpen: propIsOpen,
  isCollapsed = false,
  depth = 0,
}) => {
  // 로컬 상태로 하위메뉴 열림/닫힘 관리 (제어 컴포넌트가 아닐 경우)
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // 실제 사용할 열림/닫힘 상태 결정
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;

  // 하위 메뉴가 있는지 확인
  const hasChildren = Array.isArray(children) && children.length > 0;

  // 클릭 핸들러
  const handleClick = useCallback(() => {
    if (disabled) return;

    if (hasChildren) {
      // 하위 메뉴가 있으면 토글
      setInternalIsOpen(!isOpen);
    }

    // 외부에서 제공한 onClick 핸들러 호출
    if (onClick) {
      onClick();
    }
  }, [disabled, hasChildren, isOpen, onClick]);

  // 네비게이션 아이템 클래스 생성
  const navItemClasses = classNames(styles.navItem, {
    [styles.active]: isActive,
    [styles.disabled]: disabled,
  });

  // 하위 메뉴 클래스 생성
  const subMenuClasses = classNames(styles.subMenu, {
    [styles.expanded]: isOpen && !isCollapsed,
  });

  // 확장 아이콘 클래스 생성
  const expandIconClasses = classNames(styles.expandIcon, {
    [styles.expanded]: isOpen,
  });

  // 링크 또는 버튼으로 렌더링
  const renderItem = () => {
    const content = (
      <>
        {icon && <span className={styles.navIcon}>{icon}</span>}

        <span className={styles.navLabel}>
          <Text size="sm" color={isActive ? "primary" : "default"} noMargin>
            {label}
          </Text>
        </span>

        {badge && !isCollapsed && (
          <span className={styles.navBadge}>
            <Badge variant={isActive ? "primary" : "secondary"} size="sm">
              {badge}
            </Badge>
          </span>
        )}

        {hasChildren && !isCollapsed && (
          <span className={expandIconClasses}>
            <Icon size="sm">
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
          </span>
        )}
      </>
    );

    if (href && !disabled && !hasChildren) {
      return (
        <a
          href={href}
          className={navItemClasses}
          onClick={handleClick}
          id={`nav-item-${id}`}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        className={navItemClasses}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-expanded={hasChildren ? isOpen : undefined}
        id={`nav-item-${id}`}
      >
        {content}
      </div>
    );
  };

  // 하위 메뉴 렌더링
  const renderSubMenu = () => {
    if (!hasChildren || isCollapsed) return null;

    return (
      <div className={subMenuClasses}>
        {children?.map((child) => (
          <SidebarNavItem
            key={child.id}
            {...child}
            depth={depth + 1}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderItem()}
      {renderSubMenu()}
    </>
  );
};

SidebarNavItem.displayName = "SidebarNavItem";
