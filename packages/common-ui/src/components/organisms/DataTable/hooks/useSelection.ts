import { useState, useCallback, useMemo } from "react";
import { RowSelectionState } from "../types";

interface UseSelectionProps<T> {
  /**
   * 초기 선택 상태
   */
  initialSelectionState?: RowSelectionState;

  /**
   * 외부에서 관리되는 선택 상태
   */
  selectionState?: RowSelectionState;

  /**
   * 외부 선택 상태 변경 핸들러
   */
  onSelectionChange?: (selectionState: RowSelectionState) => void;

  /**
   * 데이터 배열
   */
  data?: T[];

  /**
   * 행 ID를 추출하는 함수
   */
  getRowId?: (row: T) => string;
}

/**
 * 데이터 테이블 행 선택 기능을 관리하는 커스텀 훅
 */
export const useSelection = <T extends Record<string, any>>({
  initialSelectionState = { selectedRowIds: {} },
  selectionState: externalSelectionState,
  onSelectionChange: externalSelectionHandler,
  data = [],
  getRowId = (row: T) => String(row.id),
}: UseSelectionProps<T> = {}) => {
  // 내부 선택 상태 관리
  const [internalSelectionState, setInternalSelectionState] =
    useState<RowSelectionState>(initialSelectionState);

  // 실제 사용할 선택 상태 결정 (외부 prop이 있으면 사용, 없으면 내부 상태 사용)
  const selectionState =
    externalSelectionState !== undefined
      ? externalSelectionState
      : internalSelectionState;

  /**
   * 선택 상태 변경 핸들러
   */
  const handleSelectionChange = useCallback(
    (newSelectionState: RowSelectionState) => {
      if (externalSelectionHandler) {
        externalSelectionHandler(newSelectionState);
      } else {
        setInternalSelectionState(newSelectionState);
      }
    },
    [externalSelectionHandler]
  );

  /**
   * 특정 행 선택/해제 토글
   */
  const toggleRowSelection = useCallback(
    (rowId: string) => {
      const newSelectedRowIds = { ...selectionState.selectedRowIds };

      if (newSelectedRowIds[rowId]) {
        delete newSelectedRowIds[rowId];
      } else {
        newSelectedRowIds[rowId] = true;
      }

      handleSelectionChange({ selectedRowIds: newSelectedRowIds });
    },
    [selectionState, handleSelectionChange]
  );

  /**
   * 특정 행 선택 상태 설정
   */
  const setRowSelected = useCallback(
    (rowId: string, isSelected: boolean) => {
      const newSelectedRowIds = { ...selectionState.selectedRowIds };

      if (isSelected) {
        newSelectedRowIds[rowId] = true;
      } else if (newSelectedRowIds[rowId]) {
        delete newSelectedRowIds[rowId];
      }

      handleSelectionChange({ selectedRowIds: newSelectedRowIds });
    },
    [selectionState, handleSelectionChange]
  );

  /**
   * 모든 행 선택/해제
   */
  const toggleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        // 모든 행 선택
        const newSelectedRowIds: Record<string, boolean> = {};
        data.forEach((row) => {
          newSelectedRowIds[getRowId(row)] = true;
        });
        handleSelectionChange({ selectedRowIds: newSelectedRowIds });
      } else {
        // 모든 행 선택 해제
        handleSelectionChange({ selectedRowIds: {} });
      }
    },
    [data, getRowId, handleSelectionChange]
  );

  /**
   * 선택 상태 초기화
   */
  const resetSelection = useCallback(() => {
    handleSelectionChange({ selectedRowIds: {} });
  }, [handleSelectionChange]);

  /**
   * 특정 행이 선택되었는지 확인
   */
  const isRowSelected = useCallback(
    (rowId: string) => {
      return !!selectionState.selectedRowIds[rowId];
    },
    [selectionState]
  );

  // 선택된 행의 ID 배열
  const selectedRowIds = useMemo(() => {
    return Object.keys(selectionState.selectedRowIds);
  }, [selectionState.selectedRowIds]);

  // 선택된 행 수
  const selectedCount = selectedRowIds.length;

  // 모든 행이 선택되었는지 확인
  const isAllSelected = useMemo(() => {
    return data.length > 0 && data.length === selectedCount;
  }, [data.length, selectedCount]);

  // 일부 행이 선택되었는지 확인
  const isSomeSelected = selectedCount > 0 && !isAllSelected;

  // 선택된 행 데이터
  const selectedRows = useMemo(() => {
    return data.filter((row) => selectionState.selectedRowIds[getRowId(row)]);
  }, [data, selectionState.selectedRowIds, getRowId]);

  return {
    selectionState,
    toggleRowSelection,
    setRowSelected,
    toggleSelectAll,
    resetSelection,
    isRowSelected,
    selectedRowIds,
    selectedCount,
    isAllSelected,
    isSomeSelected,
    selectedRows,
    handleSelectionChange,
  };
};
