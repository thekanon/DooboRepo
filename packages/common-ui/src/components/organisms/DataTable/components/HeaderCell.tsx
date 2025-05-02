import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "../DataTable.module.scss";
import { DataTableColumn, SortDirection, SortState } from "../types";

/**
 * 헤더 셀 컴포넌트
 */
export const HeaderCell = <T extends Record<string, any>>({
  column,
  sortState,
  onSortChange,
  size,
  resizable,
  onColumnResize,
}: {
  column: DataTableColumn<T>;
  sortState?: SortState[];
  onSortChange?: (sortState: SortState[]) => void;
  size?: "sm" | "md" | "lg";
  resizable?: boolean;
  onColumnResize?: (columnId: string, width: number) => void;
}) => {
  const resizerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [columnWidth, setColumnWidth] = useState<number | undefined>(undefined);
  const sortItem = sortState?.find((item) => item.column === column.id);
  const isSorted = !!sortItem;
  const sortDirection = sortItem?.direction;

  const handleSort = useCallback(() => {
    if (!column.sortable || !onSortChange) return;

    let newDirection: SortDirection = "asc";
    if (sortDirection === "asc") {
      newDirection = "desc";
    } else if (sortDirection === "desc") {
      newDirection = null;
    }

    const newSortState = [...(sortState || [])];
    const existingIndex = newSortState.findIndex(
      (item) => item.column === column.id
    );

    if (existingIndex !== -1) {
      if (newDirection === null) {
        newSortState.splice(existingIndex, 1);
      } else {
        newSortState[existingIndex] = {
          column: column.id,
          direction: newDirection,
        };
      }
    } else if (newDirection !== null) {
      newSortState.push({ column: column.id, direction: newDirection });
    }

    onSortChange(newSortState);
  }, [column, sortDirection, sortState, onSortChange]);

  const startResizing = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const stopResizing = () => {
      setIsResizing(false);
    };

    const resize = (e: MouseEvent) => {
      if (isResizing && resizerRef.current && onColumnResize) {
        const headerCell = resizerRef.current.parentElement;
        if (headerCell) {
          const headerRect = headerCell.getBoundingClientRect();
          const width = Math.max(
            column.minWidth || 80,
            e.clientX - headerRect.left
          );
          setColumnWidth(width);
          onColumnResize(column.id, width);
        }
      }
    };

    if (isResizing) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResizing);
    }

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, column.id, column.minWidth, onColumnResize]);

  const getSortIcon = () => {
    if (!isSorted) {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (sortDirection === "asc") {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 15l-6-6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const cellStyle: React.CSSProperties = {
    width: column.width || columnWidth,
    minWidth: column.minWidth !== undefined ? column.minWidth : 120,
    maxWidth: column.maxWidth,
  };

  return (
    <th
      className={classNames(
        styles.dataTableHeaderCell,
        styles[`align-${column.align || "left"}`],
        {
          [styles.sortable]: column.sortable,
          [styles.resizing]: isResizing,
        }
      )}
      style={cellStyle}
      onClick={column.sortable ? handleSort : undefined}
      role="columnheader"
      aria-sort={
        !sortDirection
          ? "none"
          : sortDirection === "asc"
            ? "ascending"
            : "descending"
      }
    >
      <div className={styles.dataTableHeaderContent}>
        <span>{column.header}</span>
        {column.sortable && (
          <span
            className={classNames(styles.dataTableSortIcon, {
              [styles.sorted]: isSorted,
            })}
          >
            {getSortIcon()}
          </span>
        )}
      </div>
      {resizable && column.resizable !== false && (
        <div
          ref={resizerRef}
          className={classNames(styles.dataTableResizer, {
            [styles.isResizing]: isResizing,
          })}
          onMouseDown={startResizing}
        />
      )}
    </th>
  );
};
