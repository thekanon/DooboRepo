import classNames from "classnames";
import { Button } from "../../../atoms/Button";
import styles from "../DataTable.module.scss";
import { BulkActionsProps } from "../types";

/**
 * 대량 작업 컴포넌트
 */
export const BulkActions = <T extends Record<string, any>>({
  selectedRowIds,
  selectedRows,
  resetSelection,
  className,
}: BulkActionsProps<T>) => {
  const selectedCount = Object.keys(selectedRowIds).length;

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className={classNames(styles.dataTableBulkActions, className)}>
      <div className={styles.dataTableBulkActionsInfo}>
        {selectedCount}개 항목 선택됨
      </div>
      <div className={styles.dataTableBulkActionsButtons}>
        <Button size="sm" variant="outline" onClick={resetSelection}>
          선택 취소
        </Button>
        <Button size="sm" variant="danger">
          삭제
        </Button>
        <Button size="sm" variant="primary">
          상태 변경
        </Button>
      </div>
    </div>
  );
};
