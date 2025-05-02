import { useState, useCallback } from "react";
import { SortState, SortDirection } from "../types";

interface UseSortProps {
  /**
   * 초기 정렬 상태
   */
  initialSortState?: SortState[];

  /**
   * 외부에서 관리되는 정렬 상태
   */
  sortState?: SortState[];

  /**
   * 외부 정렬 상태 변경 핸들러
   */
  onSortChange?: (sortState: SortState[]) => void;
}

/**
 * 데이터 테이블 정렬 기능을 관리하는 커스텀 훅
 */
export const useSort = ({
  initialSortState = [],
  sortState: externalSortState,
  onSortChange: externalSortHandler,
}: UseSortProps = {}) => {
  // 내부 정렬 상태 관리
  const [internalSortState, setInternalSortState] =
    useState<SortState[]>(initialSortState);

  // 실제 사용할 정렬 상태 결정 (외부 prop이 있으면 사용, 없으면 내부 상태 사용)
  const sortState =
    externalSortState !== undefined ? externalSortState : internalSortState;

  /**
   * 컬럼 정렬 상태 변경 핸들러
   */
  const handleSortChange = useCallback(
    (newSortState: SortState[]) => {
      if (externalSortHandler) {
        externalSortHandler(newSortState);
      } else {
        setInternalSortState(newSortState);
      }
    },
    [externalSortHandler]
  );

  /**
   * 특정 컬럼의 정렬 방향 토글
   */
  const toggleSort = useCallback(
    (columnId: string) => {
      const currentSortState = [...sortState];
      const existingIndex = currentSortState.findIndex(
        (item) => item.column === columnId
      );

      let newDirection: SortDirection = "asc";

      if (existingIndex !== -1) {
        const currentDirection = currentSortState[existingIndex].direction;

        if (currentDirection === "asc") {
          newDirection = "desc";
        } else if (currentDirection === "desc") {
          newDirection = null;
        }

        if (newDirection === null) {
          currentSortState.splice(existingIndex, 1);
        } else {
          currentSortState[existingIndex] = {
            column: columnId,
            direction: newDirection,
          };
        }
      } else {
        currentSortState.push({ column: columnId, direction: newDirection });
      }

      handleSortChange(currentSortState);
    },
    [sortState, handleSortChange]
  );

  /**
   * 정렬 상태 초기화
   */
  const resetSort = useCallback(() => {
    handleSortChange([]);
  }, [handleSortChange]);

  /**
   * 특정 컬럼의 정렬 상태 설정
   */
  const setSortForColumn = useCallback(
    (columnId: string, direction: SortDirection) => {
      const currentSortState = [...sortState];
      const existingIndex = currentSortState.findIndex(
        (item) => item.column === columnId
      );

      if (direction === null) {
        if (existingIndex !== -1) {
          currentSortState.splice(existingIndex, 1);
        }
      } else {
        if (existingIndex !== -1) {
          currentSortState[existingIndex] = { column: columnId, direction };
        } else {
          currentSortState.push({ column: columnId, direction });
        }
      }

      handleSortChange(currentSortState);
    },
    [sortState, handleSortChange]
  );

  /**
   * 특정 컬럼의 현재 정렬 상태 확인
   */
  const getSortDirectionForColumn = useCallback(
    (columnId: string): SortDirection => {
      const sortItem = sortState.find((item) => item.column === columnId);
      return sortItem ? sortItem.direction : null;
    },
    [sortState]
  );

  return {
    sortState,
    toggleSort,
    resetSort,
    setSortForColumn,
    getSortDirectionForColumn,
    handleSortChange,
  };
};
