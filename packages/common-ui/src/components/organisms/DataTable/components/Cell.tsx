import classNames from "classnames";
import styles from "../DataTable.module.scss";
import { CellProps } from "../types";

/**
 * 셀 컴포넌트
 */
export const Cell = <T extends Record<string, any>>({
  value,
  row,
  rowIndex,
  column,
  align = "left",
  size,
  className,
}: CellProps<T>) => {
  // 셀 컨텐츠 결정: 커스텀 셀 렌더러가 있으면 사용, 없으면 값 그대로 표시
  const content = column.cell ? column.cell(value, row, rowIndex) : value;

  return (
    <td
      className={classNames(
        styles.dataTableCell,
        styles[`align-${align || "left"}`],
        className
      )}
      data-label={column.header}
    >
      {content}
    </td>
  );
};
