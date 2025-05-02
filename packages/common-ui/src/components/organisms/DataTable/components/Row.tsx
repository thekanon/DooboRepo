import { useCallback } from "react";
import classNames from "classnames";
import { RowProps } from "../types";
import { Cell } from "./Cell";
import { Checkbox } from "../../../atoms/Checkbox";
import styles from "../DataTable.module.scss";

/**
 * 행 컴포넌트
 */
export const Row = <T extends Record<string, any>>({
  row,
  rowIndex,
  columns,
  isSelected,
  onSelect,
  onClick,
  rowId,
  stripeIndex,
  selectable,
  hoverable,
  size,
  className,
}: RowProps<T>) => {
  const handleRowClick = useCallback(() => {
    onClick?.(row, rowIndex);
  }, [onClick, row, rowIndex]);

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSelect?.(rowId, e.target.checked);
      e.stopPropagation(); // 이벤트 버블링 방지
    },
    [onSelect, rowId]
  );

  return (
    <tr
      className={classNames(
        styles.dataTableRow,
        {
          [styles.selected]: isSelected,
          [styles.striped]: stripeIndex % 2 === 1,
          [styles.clickable]: !!onClick,
        },
        className
      )}
      onClick={onClick ? handleRowClick : undefined}
      role="row"
    >
      {selectable && (
        <td
          className={classNames(
            styles.dataTableCell,
            styles.dataTableSelectionCell
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.dataTableCheckbox}>
            <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
          </div>
        </td>
      )}
      {columns.map((column) => {
        const value =
          typeof column.accessor === "function"
            ? column.accessor(row)
            : row[column.accessor as keyof T];

        return (
          <Cell
            key={column.id}
            value={value}
            row={row}
            rowIndex={rowIndex}
            column={column}
            align={column.align}
            size={size}
          />
        );
      })}
    </tr>
  );
};
