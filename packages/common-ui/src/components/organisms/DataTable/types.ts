export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string;
  direction: SortDirection;
}

export interface FilterValue {
  id: string;
  value: any;
  operator?: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
}

export interface PaginationState {
  pageIndex: number; 
  pageSize: number;
  totalCount?: number;
}

export interface DataTableColumn<T = any> {
  /**
   * 컬럼 식별자 (필수, 유일값)
   */
  id: string;
  
  /**
   * 컬럼 헤더에 표시될 텍스트
   */
  header: React.ReactNode;
  
  /**
   * 셀 렌더링을 위한 accessor 함수 또는 키 이름
   */
  accessor: keyof T | ((row: T) => any);
  
  /**
   * 컬럼 셀을 렌더링하는 커스텀 함수
   */
  cell?: (value: any, row: T, index: number) => React.ReactNode;
  
  /**
   * 컬럼 너비 (px, %, fr 등)
   */
  width?: string | number;
  
  /**
   * 최소 너비 (px)
   */
  minWidth?: number;
  
  /**
   * 최대 너비 (px)
   */
  maxWidth?: number;
  
  /**
   * 컬럼의 정렬 여부
   * @default true
   */
  sortable?: boolean;
  
  /**
   * 컬럼의 필터링 여부
   * @default false
   */
  filterable?: boolean;
  
  /**
   * 컬럼의 필터 타입
   */
  filterType?: 'text' | 'select' | 'date' | 'dateRange' | 'custom';
  
  /**
   * 필터 옵션 (select 타입인 경우)
   */
  filterOptions?: Array<{ label: string; value: any }>;
  
  /**
   * 커스텀 필터 컴포넌트
   */
  FilterComponent?: React.ComponentType<any>;
  
  /**
   * 셀 내용 정렬
   * @default "left"
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * 반응형 설정: 특정 브레이크포인트에서 컬럼 표시 여부
   */
  responsive?: {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
  };
  
  /**
   * 컬럼 리사이징 가능 여부
   * @default false
   */
  resizable?: boolean;
  
  /**
   * 컬럼 순서 변경 가능 여부
   * @default false
   */
  draggable?: boolean;
  
  /**
   * i18n 키
   */
  i18nKey?: string;
  
  /**
   * 추가 메타데이터
   */
  meta?: Record<string, any>;
}

export interface RowSelectionState {
  selectedRowIds: Record<string, boolean>;
}

export interface DataTableState<T = any> {
  sorting: SortState[];
  filters: FilterValue[];
  pagination: PaginationState;
  rowSelection: RowSelectionState;
  columnVisibility: Record<string, boolean>;
  columnOrder: string[];
  columnSizing: Record<string, number>;
}

export interface DataTableProps<T = any> {
  /**
   * 테이블 데이터 (배열)
   */
  data: T[];
  
  /**
   * 컬럼 설정
   */
  columns: DataTableColumn<T>[];
  
  /**
   * 데이터가 로딩 중인지 여부
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * 데이터 로드 중 오류 발생 여부
   * @default false
   */
  isError?: boolean;
  
  /**
   * 오류 메시지
   */
  errorMessage?: string;
  
  /**
   * 테이블 ID (DOM ID 속성으로 사용)
   */
  id?: string;
  
  /**
   * 전체 너비를 사용할지 여부
   * @default true
   */
  fullWidth?: boolean;
  
  /**
   * 테이블 크기
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 줄무늬 패턴 사용 여부 (홀수/짝수 행 색상 다르게)
   * @default true
   */
  striped?: boolean;
  
  /**
   * 테두리 표시 여부
   * @default true
   */
  bordered?: boolean;
  
  /**
   * 행 호버 효과 사용 여부
   * @default true
   */
  hoverable?: boolean;
  
  /**
   * 컬럼 리사이징 가능 여부
   * @default false
   */
  resizable?: boolean;
  
  /**
   * 정렬 상태
   */
  sortState?: SortState[];
  
  /**
   * 정렬 변경 핸들러
   */
  onSortChange?: (sortState: SortState[]) => void;
  
  /**
   * 필터 상태
   */
  filterState?: FilterValue[];
  
  /**
   * 필터 변경 핸들러
   */
  onFilterChange?: (filterState: FilterValue[]) => void;
  
  /**
   * 페이지네이션 상태
   */
  paginationState?: PaginationState;
  
  /**
   * 페이지네이션 변경 핸들러
   */
  onPaginationChange?: (paginationState: PaginationState) => void;
  
  /**
   * 행 선택 상태
   */
  selectionState?: RowSelectionState;
  
  /**
   * 행 선택 변경 핸들러
   */
  onSelectionChange?: (selectionState: RowSelectionState) => void;
  
  /**
   * 행 선택 가능 여부
   * @default false
   */
  selectable?: boolean;
  
  /**
   * 가상 스크롤 사용 여부
   * @default false
   */
  virtualScroll?: boolean;
  
  /**
   * 가상 스크롤 사용 시 테이블 높이
   */
  height?: number | string;
  
  /**
   * 행 클릭 핸들러
   */
  onRowClick?: (row: T, index: number) => void;
  
  /**
   * 행 렌더러 (커스텀 행 렌더링)
   */
  rowRenderer?: (row: T, index: number, columns: DataTableColumn<T>[]) => React.ReactNode;
  
  /**
   * 빈 상태 렌더러
   */
  emptyRenderer?: () => React.ReactNode;
  
  /**
   * 로딩 상태 렌더러
   */
  loadingRenderer?: () => React.ReactNode;
  
  /**
   * 오류 상태 렌더러
   */
  errorRenderer?: (error: string) => React.ReactNode;
  
  /**
   * 테이블 상단에 표시할 컴포넌트
   */
  topComponent?: React.ReactNode;
  
  /**
   * 테이블 하단에 표시할 컴포넌트
   */
  bottomComponent?: React.ReactNode;
  
  /**
   * 페이지네이션 컴포넌트
   */
  paginationComponent?: React.ReactNode;
  
  /**
   * 데이터 새로고침 핸들러
   */
  onRefresh?: () => void;
  
  /**
   * 행 ID 키 (행 식별자로 사용)
   * @default "id"
   */
  rowIdKey?: string | ((row: T) => string);
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 헤더 고정 여부
   * @default true
   */
  stickyHeader?: boolean;
  
  /**
   * 열 숨기기 가능 여부
   * @default false
   */
  columnToggle?: boolean;
  
  /**
   * 카드 뷰 전환 가능 여부 (모바일)
   * @default true
   */
  cardViewOnMobile?: boolean;
  
  /**
   * 무한 스크롤 사용 여부
   * @default false
   */
  infiniteScroll?: boolean;
  
  /**
   * 무한 스크롤 로드 핸들러
   */
  onLoadMore?: () => void;
  
  /**
   * 더 이상 로드할 데이터가 없는지 여부
   */
  hasNoMoreData?: boolean;
  
  /**
   * 그리드 레이아웃 사용 여부 (display: grid)
   * @default false
   */
  useGridLayout?: boolean;
  
  /**
   * 테이블에 추가할 스타일
   */
  style?: React.CSSProperties;
}

export interface RowProps<T = any> {
  /**
   * 행 데이터
   */
  row: T;
  
  /**
   * 행 인덱스
   */
  rowIndex: number;
  
  /**
   * 컬럼 설정
   */
  columns: DataTableColumn<T>[];
  
  /**
   * 행이 선택되었는지 여부
   */
  isSelected?: boolean;
  
  /**
   * 행 선택 변경 핸들러
   */
  onSelect?: (rowId: string, selected: boolean) => void;
  
  /**
   * 행 클릭 핸들러
   */
  onClick?: (row: T, index: number) => void;
  
  /**
   * 행 ID
   */
  rowId: string;
  
  /**
   * 행 스타일링을 위한 스트라이프 인덱스 (홀수/짝수)
   */
  stripeIndex: number;
  
  /**
   * 행 선택 가능 여부
   */
  selectable?: boolean;
  
  /**
   * 호버 효과 사용 여부
   */
  hoverable?: boolean;
  
  /**
   * 테이블 크기
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export interface CellProps<T = any> {
  /**
   * 셀 값
   */
  value: any;
  
  /**
   * 원본 행 데이터
   */
  row: T;
  
  /**
   * 행 인덱스
   */
  rowIndex: number;
  
  /**
   * 컬럼 설정
   */
  column: DataTableColumn<T>;
  
  /**
   * 셀 정렬
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * 테이블 크기
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export interface TableHeaderProps<T = any> {
  /**
   * 컬럼 설정
   */
  columns: DataTableColumn<T>[];
  
  /**
   * 정렬 상태
   */
  sortState?: SortState[];
  
  /**
   * 정렬 변경 핸들러
   */
  onSortChange?: (sortState: SortState[]) => void;
  
  /**
   * 전체 선택 여부
   */
  isAllSelected?: boolean;
  
  /**
   * 전체 선택 변경 핸들러
   */
  onSelectAll?: (selected: boolean) => void;
  
  /**
   * 행 선택 가능 여부
   */
  selectable?: boolean;
  
  /**
   * 컬럼 리사이징 가능 여부
   */
  resizable?: boolean;
  
  /**
   * 컬럼 크기 변경 핸들러
   */
  onColumnResize?: (columnId: string, width: number) => void;
  
  /**
   * 컬럼 순서 변경 핸들러
   */
  onColumnReorder?: (columnIds: string[]) => void;
  
  /**
   * 테이블 크기
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  
  /**
   * 고정 헤더 여부
   */
  sticky?: boolean;
}

export interface TablePaginationProps {
  /**
   * 페이지네이션 상태
   */
  paginationState: PaginationState;
  
  /**
   * 페이지네이션 변경 핸들러
   */
  onPaginationChange: (paginationState: PaginationState) => void;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

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

export interface TableFiltersProps<T = any> {
  /**
   * 컬럼 설정
   */
  columns: DataTableColumn<T>[];
  
  /**
   * 필터 상태
   */
  filterState: FilterValue[];
  
  /**
   * 필터 변경 핸들러
   */
  onFilterChange: (filterState: FilterValue[]) => void;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export interface BulkActionsProps<T = any> {
  /**
   * 선택된 행 ID 목록
   */
  selectedRowIds: Record<string, boolean>;
  
  /**
   * 선택된 행의 원본 데이터
   */
  selectedRows: T[];
  
  /**
   * 선택 상태 초기화 핸들러
   */
  resetSelection: () => void;
  
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}