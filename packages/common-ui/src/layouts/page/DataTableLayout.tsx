// packages/common-ui/src/layouts/page/DataTableLayout.tsx
import React from "react";
import classNames from "classnames";
import styles from "./DataTableLayout.module.scss";

export interface DataTableLayoutProps {
  /**
   * 페이지 제목
   */
  title: React.ReactNode;

  /**
   * 헤더 우측에 표시될 액션 버튼
   */
  actions?: React.ReactNode;

  /**
   * 필터 및 검색 컴포넌트
   */
  filters?: React.ReactNode;

  /**
   * 데이터 테이블
   */
  table: React.ReactNode;

  /**
   * 페이지네이션 컴포넌트
   */
  pagination?: React.ReactNode;

  /**
   * 테이블 아래 표시될 요약 정보 또는 추가 컨트롤
   */
  summary?: React.ReactNode;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean;

  /**
   * 오류 상태 및 메시지
   */
  error?: React.ReactNode;

  /**
   * 데이터가 없을 때 표시할 컨텐츠
   */
  emptyState?: React.ReactNode;
}

export const DataTableLayout: React.FC<DataTableLayoutProps> = ({
  title,
  actions,
  filters,
  table,
  pagination,
  summary,
  className,
  loading = false,
  error,
  emptyState,
}) => {
  const layoutClasses = classNames(styles.dataTableLayout, className);

  return (
    <div className={layoutClasses}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      {filters && <div className={styles.filters}>{filters}</div>}

      <div className={styles.tableContainer}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
          </div>
        )}
        {error && <div className={styles.error}>{error}</div>}
        {emptyState && <div className={styles.emptyState}>{emptyState}</div>}
        {!error && !emptyState && <div className={styles.table}>{table}</div>}
      </div>

      {pagination && <div className={styles.pagination}>{pagination}</div>}
      {summary && <div className={styles.summary}>{summary}</div>}
    </div>
  );
};
