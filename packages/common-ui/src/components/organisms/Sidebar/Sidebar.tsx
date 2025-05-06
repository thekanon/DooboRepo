"use client";
import React, { useState, useCallback, useEffect } from "react";
import classNames from "classnames";
import { SidebarProps } from "./types";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import styles from "./Sidebar.module.scss";

/**
 * 사이드바 컴포넌트
 *
 * 백오피스 애플리케이션에서 사용하는 사이드 네비게이션 바 컴포넌트입니다.
 * 로고, 메뉴 항목, 사용자 프로필 정보를 포함할 수 있으며, 접기/펼치기 기능을 지원합니다.
 */

// 자식 요소의 props 타입 정의
interface SidebarChildProps {
  isCollapsed?: boolean;
  [key: string]: any;
}

export const Sidebar: React.FC<SidebarProps> = ({
  width = "250px",
  collapsedWidth = "64px",
  isCollapsed: propIsCollapsed,
  onToggleCollapse,
  header,
  footer,
  children,
  className,
  position = "left",
  fixed = false,
  shadow = true,
  bordered = true,
  userProfile,
}) => {
  // 내부 접기/펼치기 상태 관리 (제어 컴포넌트가 아닐 경우)
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  // 실제 사용할 접기/펼치기 상태 결정
  const isCollapsed =
    propIsCollapsed !== undefined ? propIsCollapsed : internalIsCollapsed;
  // 모바일 화면에서 사이드바 표시 여부
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // 내부 토글 핸들러
  const handleToggleCollapse = useCallback(() => {
    if (onToggleCollapse) {
      // 외부에서 상태 관리
      onToggleCollapse();
    } else {
      // 내부에서 상태 관리
      setInternalIsCollapsed(!isCollapsed);
    }
  }, [isCollapsed, onToggleCollapse]);
  // 사이드바 너비 계산
  const sidebarWidth = isCollapsed
    ? typeof collapsedWidth === "number"
      ? `${collapsedWidth}px`
      : collapsedWidth
    : typeof width === "number"
      ? `${width}px`
      : width;
  // 사이드바 스타일 객체
  const sidebarStyle = {
    width: sidebarWidth,
  };
  // 모바일 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // 모바일 토글 핸들러
  const handleMobileToggle = useCallback(() => {
    setIsMobileOpen(!isMobileOpen);
  }, [isMobileOpen]);
  // 모바일 백드롭 클릭 핸들러
  const handleBackdropClick = useCallback(() => {
    setIsMobileOpen(false);
  }, []);
  // 사이드바 클래스 생성
  const sidebarClasses = classNames(
    styles.sidebar,
    {
      [styles.collapsed]: isCollapsed,
      [styles.fixed]: fixed,
      [styles.shadow]: shadow,
      [styles.bordered]: bordered,
      [styles.left]: position === "left",
      [styles.right]: position === "right",
      [styles.open]: isMobileOpen,
    },
    className
  );
  // 백드롭 클래스 생성
  const backdropClasses = classNames(styles.backdrop, {
    [styles.visible]: isMobileOpen,
  });
  return (
    <>
      {/* 모바일 백드롭 */}
      <div className={backdropClasses} onClick={handleBackdropClick} />
      {/* 사이드바 */}
      <aside
        className={sidebarClasses}
        style={sidebarStyle}
        data-testid="sidebar"
      >
        {/* 헤더 */}
        {header ? (
          header
        ) : (
          <SidebarHeader
            isCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />
        )}
        {/* 헤더가 없을 경우 기본 헤더 사용 */}
        {/* 본문 컨텐츠 */}
        <div className={styles.sidebarContent}>
          {/* children 요소들에 isCollapsed prop 전달 */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              // 타입 안전성을 위한 props 처리
              const childProps = child.props as SidebarChildProps;
              // 새로운 props 객체 생성
              const newProps: SidebarChildProps = {
                ...childProps,
                isCollapsed,
              };
              return React.cloneElement(child, newProps);
            }
            return child;
          })}
        </div>
        {/* 푸터 */}
        {footer}
      </aside>
      {/* 모바일 토글 버튼 */}
      <div className={styles.mobileToggle} onClick={handleMobileToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};
Sidebar.displayName = "Sidebar";
