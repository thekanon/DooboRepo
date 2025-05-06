"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { FormSectionProps } from "./types";
import styles from "./Form.module.scss";
import { Icon } from "../../atoms/Icon";

/**
 * FormSection 컴포넌트
 *
 * 폼 내용을 논리적인 섹션으로 분리하기 위한 컴포넌트입니다.
 * 접을 수 있는 기능(collapsible)을 지원하며, 섹션에 제목과 설명을 추가할 수 있습니다.
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  collapsible = false,
  defaultCollapsed = false,
  bordered = true,
  padding = "md",
  actions,
  style,
}) => {
  // 섹션 접힘/펼침 상태 관리
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // 섹션 접힘/펼침 토글 핸들러
  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed((prev) => !prev);
    }
  };

  // 섹션 클래스 이름 생성
  const sectionClasses = classNames(
    styles.formSection,
    {
      [styles.bordered]: bordered,
      [styles.collapsible]: collapsible,
    },
    className
  );

  // 섹션 내용 클래스 이름 생성
  const contentClasses = classNames(
    styles.sectionContent,
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    {
      [styles.collapsed]: isCollapsed,
    }
  );

  // 접기/펼치기 버튼 클래스 이름 생성
  const collapseButtonClasses = classNames(styles.collapseButton, {
    [styles.collapsed]: isCollapsed,
  });

  return (
    <div className={sectionClasses} style={style}>
      {/* 섹션 헤더 */}
      {(title || description || actions) && (
        <div className={styles.sectionHeader}>
          <div className={styles.titleContainer}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {description && (
              <div className={styles.description}>{description}</div>
            )}
          </div>

          <div className={styles.actions}>
            {actions}

            {/* 접기/펼치기 버튼 */}
            {collapsible && (
              <button
                type="button"
                className={collapseButtonClasses}
                onClick={toggleCollapse}
                aria-expanded={!isCollapsed}
                aria-controls={`section-content-${title?.toString().toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon size="sm">
                  <path
                    d="M19 9l-7 7-7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Icon>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 섹션 내용 */}
      <div
        className={contentClasses}
        id={
          title
            ? `section-content-${title.toString().toLowerCase().replace(/\s+/g, "-")}`
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
};

FormSection.displayName = "FormSection";
