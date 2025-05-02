import { IconButton } from "../../../atoms/IconButton";
import { Checkbox } from "../../../atoms/Checkbox";
import { DropdownMenu } from "../../../molecules/DropdownMenu";
import { DataTableColumn } from "../types";
import styles from "./ColumnToggle.module.scss";

export interface ColumnToggleProps<T = any> {
  /**
   * 컬럼 설정
   */
  columns: DataTableColumn<T>[];

  /**
   * 컬럼 가시성 상태
   */
  columnVisibility: Record<string, boolean>;

  /**
   * 컬럼 가시성 변경 핸들러
   */
  onColumnVisibilityChange: (columnVisibility: Record<string, boolean>) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 스마트 드롭다운 메뉴를 사용하는 컬럼 토글 컴포넌트
 */
export const ColumnToggle = <T extends Record<string, any>>({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
  className,
}: ColumnToggleProps<T>) => {
  // 컬럼 토글 핸들러
  const handleColumnToggle = (columnId: string) => {
    const newVisibility = {
      ...columnVisibility,
      [columnId]: !columnVisibility[columnId],
    };
    onColumnVisibilityChange(newVisibility);
  };

  // 모든 컬럼 선택/해제 핸들러
  const handleToggleAll = (selected: boolean) => {
    const newVisibility: Record<string, boolean> = {};
    columns.forEach((column) => {
      newVisibility[column.id] = selected;
    });
    onColumnVisibilityChange(newVisibility);
  };

  // 현재 선택된 컬럼 수
  const selectedCount = Object.values(columnVisibility).filter(Boolean).length;

  return (
    <DropdownMenu
      className={className}
      menuClassName={styles.columnToggleMenu}
      horizontalAlign="right"
      trigger={
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="컬럼 표시 설정"
          title="컬럼 표시 설정"
          ariaLabel="컬럼 표시 설정"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3v18M3 12h18M20 6H4M20 18H4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      }
    >
      <div className={styles.columnToggleHeader}>
        <span className={styles.columnToggleTitle}>컬럼 설정</span>
        <div className={styles.columnToggleActions}>
          <button
            className={styles.columnToggleActionButton}
            onClick={() => handleToggleAll(true)}
          >
            모두 선택
          </button>
          <button
            className={styles.columnToggleActionButton}
            onClick={() => handleToggleAll(false)}
          >
            모두 해제
          </button>
        </div>
      </div>

      <div className={styles.columnToggleInfo}>
        {selectedCount}/{columns.length} 컬럼 표시 중
      </div>

      <ul className={styles.columnToggleList}>
        {columns.map((column) => (
          <li
            key={column.id}
            className={styles.columnToggleItem}
            onClick={() => handleColumnToggle(column.id)}
          >
            <div className={styles.columnToggleCheckbox}>
              <Checkbox
                checked={columnVisibility[column.id] !== false}
                onChange={() => {}}
                id={`column-toggle-${column.id}`}
              />
            </div>
            <label
              htmlFor={`column-toggle-${column.id}`}
              className={styles.columnToggleLabel}
            >
              {column.header}
            </label>
          </li>
        ))}
      </ul>
    </DropdownMenu>
  );
};
