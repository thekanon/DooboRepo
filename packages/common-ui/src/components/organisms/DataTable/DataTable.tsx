import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import classNames from "classnames";
import { Button } from "../../atoms/Button";
import { Pagination } from "../../molecules/Pagination";
import { InfoBox } from "../../molecules/InfoBox";
import { DataTableProps } from "./types";
import styles from "./DataTable.module.scss";

import { ColumnToggle, TableHeader, Row, BulkActions } from "./components";
import { InfiniteScroll } from "../../molecules/InfiniteScroll";
import { useSort, useFilter, usePagination, useSelection } from "./hooks";

/**
 * 데이터 테이블 메인 컴포넌트
 */
export const DataTable = <T extends Record<string, any>>({
  data,
  columns: propColumns,
  isLoading = false,
  isError = false,
  errorMessage = "데이터를 불러오는 중 오류가 발생했습니다.",
  id,
  fullWidth = true,
  size = "md",
  striped = true,
  bordered = true,
  hoverable = true,
  resizable = false,
  sortState: externalSortState,
  onSortChange: externalSortHandler,
  filterState: externalFilterState,
  onFilterChange: externalFilterHandler,
  paginationState: externalPaginationState,
  onPaginationChange: externalPaginationHandler,
  selectionState: externalSelectionState,
  onSelectionChange: externalSelectionHandler,
  selectable = false,
  virtualScroll = false,
  height,
  onRowClick,
  rowRenderer,
  emptyRenderer,
  loadingRenderer,
  errorRenderer,
  topComponent,
  bottomComponent,
  paginationComponent,
  onRefresh,
  rowIdKey = "id",
  className,
  stickyHeader = true,
  columnToggle = false,
  cardViewOnMobile = true,
  infiniteScroll = false,
  onLoadMore,
  hasNoMoreData = false,
  useGridLayout = false,
  style,
}: DataTableProps<T>) => {
  const tableId = id || "data-table";
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnSizing, setColumnSizing] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // 행 ID 추출 함수
  const getRowId = useCallback(
    (row: T): string => {
      if (typeof rowIdKey === "function") {
        return rowIdKey(row);
      }
      return String(row[rowIdKey as keyof T]);
    },
    [rowIdKey]
  );

  // 커스텀 훅 사용: 정렬
  const sort = useSort({
    initialSortState: [],
    sortState: externalSortState,
    onSortChange: externalSortHandler,
  });

  // 커스텀 훅 사용: 필터링
  const filter = useFilter({
    initialFilterState: [],
    filterState: externalFilterState,
    onFilterChange: externalFilterHandler,
  });

  // 커스텀 훅 사용: 페이지네이션
  const pagination = usePagination({
    initialPaginationState: { pageIndex: 0, pageSize: 10 },
    paginationState: externalPaginationState,
    onPaginationChange: externalPaginationHandler,
  });

  // 커스텀 훅 사용: 행 선택
  const selection = useSelection<T>({
    initialSelectionState: { selectedRowIds: {} },
    selectionState: externalSelectionState,
    onSelectionChange: externalSelectionHandler,
    data,
    getRowId,
  });

  // 컬럼 초기화
  useEffect(() => {
    const initialColumnVisibility: Record<string, boolean> = {};
    const initialColumnOrder: string[] = [];

    propColumns.forEach((column) => {
      initialColumnVisibility[column.id] = true;
      initialColumnOrder.push(column.id);
    });

    setColumnVisibility(initialColumnVisibility);
    setColumnOrder(initialColumnOrder);
  }, [propColumns]);

  // 무한 스크롤 핸들러
  const handleInfiniteScroll = useCallback(async () => {
    if (onLoadMore && !isLoading && !hasNoMoreData) {
      await onLoadMore();
    }
  }, [onLoadMore, isLoading, hasNoMoreData]);

  // 컬럼 가시성 변경 핸들러
  const handleColumnVisibilityChange = useCallback(
    (newColumnVisibility: Record<string, boolean>) => {
      setColumnVisibility(newColumnVisibility);
    },
    []
  );

  // 컬럼 순서 변경 핸들러
  const handleColumnReorder = useCallback((newColumnOrder: string[]) => {
    setColumnOrder(newColumnOrder);
  }, []);

  // 컬럼 크기 변경 핸들러
  const handleColumnResize = useCallback((columnId: string, width: number) => {
    setColumnSizing((prev) => ({
      ...prev,
      [columnId]: width,
    }));
  }, []);

  // 실제 표시할 컬럼 필터링
  const visibleColumns = useMemo(() => {
    return propColumns.filter(
      (column) => columnVisibility[column.id] !== false
    );
  }, [propColumns, columnVisibility]);

  // 그리드 레이아웃을 위한 스타일
  const gridTemplateColumns = useMemo(() => {
    if (!useGridLayout) return undefined;

    let template = selectable ? "auto " : "";
    template += visibleColumns
      .map((column) => {
        const width = columnSizing[column.id] || column.width || "auto";
        return typeof width === "number" ? `${width}px` : width;
      })
      .join(" ");

    return template;
  }, [useGridLayout, selectable, visibleColumns, columnSizing]);

  // 테이블 스타일
  const tableStyle: React.CSSProperties = {
    ...style,
    ...(useGridLayout ? { gridTemplateColumns } : {}),
  };

  // 컨테이너 스타일
  const containerScrollable = virtualScroll || infiniteScroll;

  const containerStyle: React.CSSProperties = {
    maxHeight: containerScrollable ? height ?? 600 : undefined, // 기본값 600px
    height: containerScrollable ? height ?? 600 : undefined,
    overflowY: containerScrollable ? "auto" : undefined,
  };
  // 빈 데이터 처리
  const renderEmptyState = () => {
    if (emptyRenderer) {
      return emptyRenderer();
    }
    return (
      <tr className={styles.dataTableEmptyRow}>
        <td
          className={styles.dataTableStatusCell}
          colSpan={visibleColumns.length + (selectable ? 1 : 0)}
        >
          데이터가 없습니다.
        </td>
      </tr>
    );
  };

  // 로딩 상태 처리
  const renderLoadingState = () => {
    if (loadingRenderer) {
      return loadingRenderer();
    }
    return (
      <tr className={styles.dataTableLoadingRow}>
        <td
          className={styles.dataTableStatusCell}
          colSpan={visibleColumns.length + (selectable ? 1 : 0)}
        >
          <div className={styles.dataTableSpinner}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeOpacity="0.25"
              />
              <path
                d="M12 2C6.47715 2 2 6.47715 2 12"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          데이터를 불러오는 중입니다...
        </td>
      </tr>
    );
  };

  // 에러 상태 처리
  const renderErrorState = () => {
    if (errorRenderer) {
      return errorRenderer(errorMessage);
    }
    return (
      <tr className={styles.dataTableErrorRow}>
        <td
          className={styles.dataTableStatusCell}
          colSpan={visibleColumns.length + (selectable ? 1 : 0)}
        >
          <InfoBox
            variant="error"
            title="오류 발생"
            align="center"
            actions={
              onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  다시 시도
                </Button>
              )
            }
          >
            {errorMessage}
          </InfoBox>
        </td>
      </tr>
    );
  };

  return (
    <div
      id={tableId}
      className={classNames(
        styles.dataTableWrapper,
        {
          [styles.fullWidth]: fullWidth,
        },
        className
      )}
    >
      {topComponent}

      {/* 테이블 상단 기능 영역 */}
      <div className={styles.dataTableToolbar}>
        {selectable && selection.selectedCount > 0 && (
          <BulkActions
            selectedRowIds={selection.selectionState.selectedRowIds}
            selectedRows={selection.selectedRows}
            resetSelection={selection.resetSelection}
          />
        )}

        {/* 컬럼 토글 기능 추가 */}
        {columnToggle && (
          <div className={styles.dataTableTools}>
            <ColumnToggle
              columns={propColumns}
              columnVisibility={columnVisibility}
              onColumnVisibilityChange={handleColumnVisibilityChange}
            />
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        className={classNames(styles.dataTableContainer, {
          [styles.stickyHeader]: stickyHeader,
        })}
        style={containerStyle}
      >
        <table
          className={classNames(styles.dataTable, styles[`size-${size}`], {
            [styles.fullWidth]: fullWidth,
            [styles.bordered]: bordered,
            [styles.hoverable]: hoverable,
            [styles.gridLayout]: useGridLayout,
            [styles.cardViewOnMobile]: cardViewOnMobile,
          })}
          style={tableStyle}
          role="table"
        >
          <TableHeader
            columns={visibleColumns}
            sortState={sort.sortState}
            onSortChange={sort.handleSortChange}
            isAllSelected={selection.isAllSelected}
            onSelectAll={selection.toggleSelectAll}
            selectable={selectable}
            resizable={resizable}
            onColumnResize={handleColumnResize}
            size={size}
            sticky={stickyHeader}
          />

          <tbody className={styles.dataTableBody}>
            {isLoading && !infiniteScroll
              ? renderLoadingState()
              : isError
                ? renderErrorState()
                : data.length === 0
                  ? renderEmptyState()
                  : data.map((row, rowIndex) => {
                      const rowId = getRowId(row);
                      const isSelected = selection.isRowSelected(rowId);

                      if (rowRenderer) {
                        return rowRenderer(row, rowIndex, visibleColumns);
                      }

                      return (
                        <Row
                          key={rowId}
                          row={row}
                          rowIndex={rowIndex}
                          columns={visibleColumns}
                          isSelected={isSelected}
                          onSelect={selection.setRowSelected}
                          onClick={onRowClick}
                          rowId={rowId}
                          stripeIndex={striped ? rowIndex : 0}
                          selectable={selectable}
                          hoverable={hoverable}
                          size={size}
                        />
                      );
                    })}
          </tbody>
        </table>

        {/* 무한 스크롤 컴포넌트 */}
        {infiniteScroll && (
          <InfiniteScroll
            onIntersect={handleInfiniteScroll}
            isLoading={isLoading}
            showLoadingIndicator={true}
            rootMargin="100px"
          />
        )}
      </div>

      {paginationComponent ||
        (pagination.paginationState &&
          externalPaginationHandler &&
          !infiniteScroll && (
            <div className={styles.dataTablePagination}>
              <Pagination
                currentPage={pagination.currentPage}
                pageSize={pagination.paginationState.pageSize}
                totalPages={pagination.paginationState.totalCount || 0}
                onPageChange={(page) => pagination.setPage(page - 1)}
              />
            </div>
          ))}

      {bottomComponent}
    </div>
  );
};
