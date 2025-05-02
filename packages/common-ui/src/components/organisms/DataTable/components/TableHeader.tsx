import classNames from "classnames";
import { Checkbox } from "../../../atoms/Checkbox";
import { HeaderCell } from "./HeaderCell";
import { TableHeaderProps } from "../types";
import styles from "../DataTable.module.scss";

/**
 * 테이블 헤더 컴포넌트
 */
export const TableHeader = <T extends Record<string, any>>({
  columns,
  sortState,
  onSortChange,
  isAllSelected,
  onSelectAll,
  selectable,
  resizable,
  onColumnResize,
  size,
  className,
  sticky,
}: TableHeaderProps<T>) => {
  return (
    <thead className={classNames(styles.dataTableHeader, className)}>
      <tr className={styles.dataTableHeaderRow}>
        {selectable && (
          <th
            className={classNames(
              styles.dataTableHeaderCell,
              styles.dataTableSelectionCell
            )}
          >
            <div className={styles.dataTableCheckbox}>
              <Checkbox
                checked={isAllSelected}
                onChange={(e) => onSelectAll?.(e.target.checked)}
              />
            </div>
          </th>
        )}
        {columns.map((column) => (
          <HeaderCell
            key={column.id}
            column={column}
            sortState={sortState}
            onSortChange={onSortChange}
            size={size}
            resizable={resizable}
            onColumnResize={onColumnResize}
          />
        ))}
      </tr>
    </thead>
  );
};
