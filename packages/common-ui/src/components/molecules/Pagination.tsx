import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./Pagination.module.scss";

export interface PaginationProps {
  /**
   * 현재 페이지 (1부터 시작)
   */
  currentPage: number;

  /**
   * 전체 페이지 수
   */
  totalPages: number;

  /**
   * 페이지 변경 이벤트 핸들러
   */
  onPageChange: (page: number) => void;

  /**
   * 화면에 표시할 페이지 버튼 수
   * @default 5
   */
  siblingCount?: number;

  /**
   * 이전/다음 페이지 이동 버튼 표시 여부
   * @default true
   */
  showNavigationButtons?: boolean;

  /**
   * 처음/마지막 페이지 이동 버튼 표시 여부
   * @default true
   */
  showFirstLastButtons?: boolean;

  /**
   * 페이지 정보 표시 여부 (예: "1-10 / 100")
   * @default true
   */
  showPageInfo?: boolean;

  /**
   * 페이지당 아이템 수
   */
  pageSize?: number;

  /**
   * 전체 아이템 수 (pageSize와 함께 사용하여 totalPages 계산)
   */
  totalItems?: number;

  /**
   * 사이즈
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 인라인 스타일
   */
  style?: React.CSSProperties;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages: propsTotalPages,
  onPageChange,
  siblingCount = 2,
  showNavigationButtons = true,
  showFirstLastButtons = true,
  showPageInfo = true,
  pageSize,
  totalItems,
  size = "md",
  disabled = false,
  className,
  style,
}) => {
  // totalItems와 pageSize가 제공되면 totalPages 계산
  const totalPages = useMemo(() => {
    if (propsTotalPages) return propsTotalPages;
    if (totalItems && pageSize) return Math.ceil(totalItems / pageSize);
    return 0;
  }, [propsTotalPages, totalItems, pageSize]);

  // 페이지 범위 생성
  const range = useMemo(() => {
    const siblingSpace = siblingCount * 2 + 1; // 양쪽 형제 + 현재 페이지
    
    // 총 페이지 수가 표시할 버튼 수보다 작거나 같으면 모든 페이지 표시
    if (totalPages <= siblingSpace + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 시작과 끝 페이지 계산
    let startPage = Math.max(currentPage - siblingCount, 1);
    let endPage = Math.min(currentPage + siblingCount, totalPages);

    // 시작 또는 끝이 너무 가까우면 조정
    if (startPage <= 2) {
      endPage = siblingSpace + 1;
      startPage = 1;
    } else if (endPage >= totalPages - 1) {
      startPage = totalPages - siblingSpace;
      endPage = totalPages;
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    // 필요한 경우 생략 부호 추가
    if (startPage > 1) {
      if (startPage > 2) {
        pages.unshift(-1); // 생략 부호 표시용 특수 값
      }
      pages.unshift(1);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(-2); // 생략 부호 표시용 특수 값
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, siblingCount]);

  // 페이지 정보 텍스트 생성
  const pageInfoText = useMemo(() => {
    if (pageSize && totalItems) {
      const start = (currentPage - 1) * pageSize + 1;
      const end = Math.min(currentPage * pageSize, totalItems);
      return `${start}-${end} / ${totalItems}`;
    }
    return `${currentPage} / ${totalPages}`;
  }, [currentPage, totalPages, pageSize, totalItems]);

  const handlePageClick = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages || disabled) return;
    onPageChange(page);
  };

  // CSS 클래스 생성
  const paginationClasses = classNames(
    styles.pagination,
    styles[`size-${size}`],
    {
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <nav className={paginationClasses} style={style} aria-label="pagination">
      <ul className={styles.list}>
        {/* 첫 페이지 버튼 */}
        {showFirstLastButtons && (
          <li className={styles.item}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.disabled]: currentPage === 1 || disabled,
              })}
              onClick={() => handlePageClick(1)}
              disabled={currentPage === 1 || disabled}
              aria-label="First page"
            >
              ≪
            </button>
          </li>
        )}

        {/* 이전 페이지 버튼 */}
        {showNavigationButtons && (
          <li className={styles.item}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.disabled]: currentPage === 1 || disabled,
              })}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1 || disabled}
              aria-label="Previous page"
            >
              ‹
            </button>
          </li>
        )}

        {/* 페이지 번호 버튼 */}
        {range.map((page, index) => {
          // 생략 부호 처리
          if (page < 0) {
            return (
              <li key={`ellipsis-${index}`} className={styles.item}>
                <span className={styles.ellipsis}>...</span>
              </li>
            );
          }

          return (
            <li key={page} className={styles.item}>
              <button
                type="button"
                className={classNames(styles.button, {
                  [styles.active]: page === currentPage,
                  [styles.disabled]: disabled,
                })}
                onClick={() => handlePageClick(page)}
                disabled={disabled}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* 다음 페이지 버튼 */}
        {showNavigationButtons && (
          <li className={styles.item}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.disabled]: currentPage === totalPages || disabled,
              })}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages || disabled}
              aria-label="Next page"
            >
              ›
            </button>
          </li>
        )}

        {/* 마지막 페이지 버튼 */}
        {showFirstLastButtons && (
          <li className={styles.item}>
            <button
              type="button"
              className={classNames(styles.button, {
                [styles.disabled]: currentPage === totalPages || disabled,
              })}
              onClick={() => handlePageClick(totalPages)}
              disabled={currentPage === totalPages || disabled}
              aria-label="Last page"
            >
              ≫
            </button>
          </li>
        )}
      </ul>

      {/* 페이지 정보 */}
      {showPageInfo && totalPages > 0 && (
        <div className={styles.pageInfo}>{pageInfoText}</div>
      )}
    </nav>
  );
};

Pagination.displayName = "Pagination";