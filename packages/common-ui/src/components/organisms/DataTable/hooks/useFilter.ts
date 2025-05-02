import { useState, useCallback } from "react";
import { FilterValue } from "../types";

interface UseFilterProps {
  /**
   * 초기 필터 상태
   */
  initialFilterState?: FilterValue[];

  /**
   * 외부에서 관리되는 필터 상태
   */
  filterState?: FilterValue[];

  /**
   * 외부 필터 상태 변경 핸들러
   */
  onFilterChange?: (filterState: FilterValue[]) => void;
}

/**
 * 데이터 테이블 필터링 기능을 관리하는 커스텀 훅
 */
export const useFilter = ({
  initialFilterState = [],
  filterState: externalFilterState,
  onFilterChange: externalFilterHandler,
}: UseFilterProps = {}) => {
  // 내부 필터 상태 관리
  const [internalFilterState, setInternalFilterState] =
    useState<FilterValue[]>(initialFilterState);

  // 실제 사용할 필터 상태 결정 (외부 prop이 있으면 사용, 없으면 내부 상태 사용)
  const filterState =
    externalFilterState !== undefined
      ? externalFilterState
      : internalFilterState;

  /**
   * 필터 상태 변경 핸들러
   */
  const handleFilterChange = useCallback(
    (newFilterState: FilterValue[]) => {
      if (externalFilterHandler) {
        externalFilterHandler(newFilterState);
      } else {
        setInternalFilterState(newFilterState);
      }
    },
    [externalFilterHandler]
  );

  /**
   * 특정 필터 추가 또는 업데이트
   */
  const setFilter = useCallback(
    (filterId: string, value: any, operator?: FilterValue["operator"]) => {
      const currentFilterState = [...filterState];
      const existingIndex = currentFilterState.findIndex(
        (item) => item.id === filterId
      );

      if (value === null || value === undefined || value === "") {
        // 값이 비어있으면 필터 제거
        if (existingIndex !== -1) {
          currentFilterState.splice(existingIndex, 1);
        }
      } else {
        // 값이 있으면 필터 추가 또는 업데이트
        if (existingIndex !== -1) {
          currentFilterState[existingIndex] = {
            ...currentFilterState[existingIndex],
            value,
            ...(operator ? { operator } : {}),
          };
        } else {
          currentFilterState.push({
            id: filterId,
            value,
            ...(operator ? { operator } : {}),
          });
        }
      }

      handleFilterChange(currentFilterState);
    },
    [filterState, handleFilterChange]
  );

  /**
   * 모든 필터 초기화
   */
  const resetFilters = useCallback(() => {
    handleFilterChange([]);
  }, [handleFilterChange]);

  /**
   * 특정 필터 제거
   */
  const removeFilter = useCallback(
    (filterId: string) => {
      const currentFilterState = filterState.filter(
        (item) => item.id !== filterId
      );
      handleFilterChange(currentFilterState);
    },
    [filterState, handleFilterChange]
  );

  /**
   * 특정 ID의 필터 값 가져오기
   */
  const getFilterValue = useCallback(
    (filterId: string) => {
      const filter = filterState.find((item) => item.id === filterId);
      return filter ? filter.value : undefined;
    },
    [filterState]
  );

  /**
   * 필터가 활성화되었는지 확인
   */
  const hasActiveFilters = filterState.length > 0;

  return {
    filterState,
    setFilter,
    resetFilters,
    removeFilter,
    getFilterValue,
    hasActiveFilters,
    handleFilterChange,
  };
};
