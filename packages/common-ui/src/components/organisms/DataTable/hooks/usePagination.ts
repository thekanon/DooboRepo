import { useState, useCallback, useMemo } from "react";
import { PaginationState } from "../types";

interface UsePaginationProps {
  /**
   * 초기 페이지네이션 상태
   */
  initialPaginationState?: Partial<PaginationState>;

  /**
   * 외부에서 관리되는 페이지네이션 상태
   */
  paginationState?: PaginationState;

  /**
   * 외부 페이지네이션 상태 변경 핸들러
   */
  onPaginationChange?: (paginationState: PaginationState) => void;

  /**
   * 총 항목 수
   */
  totalCount?: number;
}

/**
 * 데이터 테이블 페이지네이션 기능을 관리하는 커스텀 훅
 */
export const usePagination = ({
  initialPaginationState = {},
  paginationState: externalPaginationState,
  onPaginationChange: externalPaginationHandler,
  totalCount,
}: UsePaginationProps = {}) => {
  // 기본값 설정
  const defaultState: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
    ...initialPaginationState,
  };

  // 내부 페이지네이션 상태 관리
  const [internalPaginationState, setInternalPaginationState] =
    useState<PaginationState>(defaultState);

  // 실제 사용할 페이지네이션 상태 결정 (외부 prop이 있으면 사용, 없으면 내부 상태 사용)
  const paginationState =
    externalPaginationState !== undefined
      ? {
          ...externalPaginationState,
          totalCount: totalCount ?? externalPaginationState.totalCount,
        }
      : {
          ...internalPaginationState,
          totalCount: totalCount ?? internalPaginationState.totalCount,
        };

  /**
   * 페이지네이션 상태 변경 핸들러
   */
  const handlePaginationChange = useCallback(
    (newPaginationState: Partial<PaginationState>) => {
      const updatedState = {
        ...paginationState,
        ...newPaginationState,
      };

      if (externalPaginationHandler) {
        externalPaginationHandler(updatedState);
      } else {
        setInternalPaginationState(updatedState);
      }
    },
    [paginationState, externalPaginationHandler]
  );

  /**
   * 페이지 변경 핸들러
   */
  const setPage = useCallback(
    (pageIndex: number) => {
      handlePaginationChange({ pageIndex });
    },
    [handlePaginationChange]
  );

  /**
   * 페이지 크기 변경 핸들러
   */
  const setPageSize = useCallback(
    (pageSize: number) => {
      // 페이지 크기가 변경되면 첫 번째 페이지로 돌아감
      handlePaginationChange({ pageSize, pageIndex: 0 });
    },
    [handlePaginationChange]
  );

  // 전체 페이지 수 계산
  const totalPageCount = useMemo(() => {
    if (!paginationState.totalCount) return 0;
    return Math.ceil(paginationState.totalCount / paginationState.pageSize);
  }, [paginationState.totalCount, paginationState.pageSize]);

  // 이전 페이지가 있는지 확인
  const hasPreviousPage = paginationState.pageIndex > 0;

  // 다음 페이지가 있는지 확인
  const hasNextPage = paginationState.pageIndex < totalPageCount - 1;

  /**
   * 다음 페이지로 이동
   */
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(paginationState.pageIndex + 1);
    }
  }, [paginationState.pageIndex, setPage, hasNextPage]);

  /**
   * 이전 페이지로 이동
   */
  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage(paginationState.pageIndex - 1);
    }
  }, [paginationState.pageIndex, setPage, hasPreviousPage]);

  /**
   * 첫 번째 페이지로 이동
   */
  const firstPage = useCallback(() => {
    setPage(0);
  }, [setPage]);

  /**
   * 마지막 페이지로 이동
   */
  const lastPage = useCallback(() => {
    setPage(Math.max(0, totalPageCount - 1));
  }, [setPage, totalPageCount]);

  // 현재 보여지는 항목의 범위 계산
  const pageRange = useMemo(() => {
    const start = paginationState.pageIndex * paginationState.pageSize + 1;
    const end = Math.min(
      start + paginationState.pageSize - 1,
      paginationState.totalCount || 0
    );
    return { start, end };
  }, [paginationState]);

  return {
    paginationState,
    pageRange,
    totalPageCount,
    hasPreviousPage,
    hasNextPage,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    handlePaginationChange,
    // 편의 메서드: 1부터 시작하는 현재 페이지 번호
    currentPage: paginationState.pageIndex + 1,
    // 페이지네이션 정보 문자열 (예: "1-10 of 100")
    paginationInfo: paginationState.totalCount
      ? `${pageRange.start}-${pageRange.end} of ${paginationState.totalCount}`
      : "",
  };
};
