import { useState, useRef, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@doo/common-ui";
import { Button, InfoBox } from "@doo/common-ui";
import { DataTableColumn, SortState, PaginationState } from "@doo/common-ui";
import { mockQuizzes, mockMoreQuizzes, Quiz } from "../../mocks/mockDataTable";

// 상태 배지 렌더러
const StatusBadge = ({ status }: { status: Quiz["status"] }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "published":
        return {
          backgroundColor: "#e6f7ff",
          color: "#1890ff",
          border: "1px solid #91d5ff",
        };
      case "draft":
        return {
          backgroundColor: "#fff7e6",
          color: "#fa8c16",
          border: "1px solid #ffd591",
        };
      case "archived":
        return {
          backgroundColor: "#f9f0ff",
          color: "#722ed1",
          border: "1px solid #d3adf7",
        };
      default:
        return {};
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "published":
        return "게시됨";
      case "draft":
        return "임시저장";
      case "archived":
        return "보관됨";
      default:
        return status;
    }
  };

  return (
    <span
      style={{
        ...getStatusStyle(),
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: 500,
        display: "inline-block",
      }}
    >
      {getStatusText()}
    </span>
  );
};

// 기본 컬럼 정의
const columns: DataTableColumn<Quiz>[] = [
  {
    id: "id",
    header: "ID",
    accessor: "id",
    width: 100,
  },
  {
    id: "title",
    header: "퀴즈 제목",
    accessor: "title",
    sortable: true,
  },
  {
    id: "category",
    header: "카테고리",
    accessor: "category",
    width: 120,
    sortable: true,
  },
  {
    id: "questions",
    header: "문항 수",
    accessor: "questions",
    width: 100,
    align: "center",
    sortable: true,
  },
  {
    id: "author",
    header: "작성자",
    accessor: "author",
    width: 120,
    sortable: true,
  },
  {
    id: "created",
    header: "생성일",
    accessor: "created",
    width: 120,
    sortable: true,
  },
  {
    id: "status",
    header: "상태",
    accessor: "status",
    width: 100,
    align: "center",
    cell: (value) => <StatusBadge status={value as Quiz["status"]} />,
    sortable: true,
  },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/Organisms/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "테이블 크기",
    },
    striped: {
      control: "boolean",
      description: "줄무늬 패턴 사용 여부",
    },
    bordered: {
      control: "boolean",
      description: "테두리 표시 여부",
    },
    hoverable: {
      control: "boolean",
      description: "행 호버 효과 사용 여부",
    },
    selectable: {
      control: "boolean",
      description: "행 선택 가능 여부",
    },
    stickyHeader: {
      control: "boolean",
      description: "헤더 고정 여부",
    },
    cardViewOnMobile: {
      control: "boolean",
      description: "모바일에서 카드 뷰로 전환 여부",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// 기본 데이터 테이블
export const Default: Story = {
  args: {
    data: mockQuizzes as Record<string, any>[],
    columns: columns as unknown as DataTableColumn<Record<string, any>>[],
    size: "md",
    striped: true,
    bordered: true,
    hoverable: true,
    stickyHeader: true,
  },
};

// 로딩 상태 테이블
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

// 빈 데이터 테이블
export const Empty: Story = {
  args: {
    ...Default.args,
    data: [] as Record<string, any>[],
  },
};

// 에러 상태 테이블
export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    errorMessage: "퀴즈 데이터를 불러오는 중 오류가 발생했습니다.",
  },
};

// 선택 가능한 테이블
export const Selectable: Story = {
  render: () => {
    const [selectedRowIds, setSelectedRowIds] = useState<
      Record<string, boolean>
    >({});

    const handleSelectionChange = (newState: {
      selectedRowIds: Record<string, boolean>;
    }) => {
      setSelectedRowIds(newState.selectedRowIds);
    };

    return (
      <DataTable
        data={mockQuizzes as Record<string, any>[]}
        columns={columns as unknown as DataTableColumn<Record<string, any>>[]}
        selectable={true}
        selectionState={{ selectedRowIds }}
        onSelectionChange={handleSelectionChange}
        size="md"
        striped={true}
        bordered={true}
        hoverable={true}
        stickyHeader={true}
      />
    );
  },
};

// 행 클릭 이벤트 있는 테이블
export const WithRowClick: Story = {
  render: () => {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

    const handleRowClick = (row: Record<string, any>, index: number) => {
      setSelectedQuiz(row as Quiz);
    };

    return (
      <div>
        <DataTable
          data={mockQuizzes as Record<string, any>[]}
          columns={columns as unknown as DataTableColumn<Record<string, any>>[]}
          onRowClick={handleRowClick}
          size="md"
          striped={true}
          bordered={true}
          hoverable={true}
          stickyHeader={true}
        />

        {selectedQuiz && (
          <div style={{ marginTop: "20px" }}>
            <InfoBox title="선택된 퀴즈 정보" variant="info">
              <pre>{JSON.stringify(selectedQuiz, null, 2)}</pre>
            </InfoBox>
          </div>
        )}
      </div>
    );
  },
};

// 페이지네이션 있는 테이블
export const WithPagination: Story = {
  render: () => {
    const [paginationState, setPaginationState] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5,
      totalCount: mockQuizzes.length,
    });

    const paginatedData = mockQuizzes.slice(
      paginationState.pageIndex * paginationState.pageSize,
      (paginationState.pageIndex + 1) * paginationState.pageSize
    );

    const handlePaginationChange = (newState: PaginationState) => {
      setPaginationState({
        ...newState,
        totalCount: mockQuizzes.length,
      });
    };

    return (
      <DataTable
        data={paginatedData as Record<string, any>[]}
        columns={columns as unknown as DataTableColumn<Record<string, any>>[]}
        paginationState={paginationState}
        onPaginationChange={handlePaginationChange}
        size="md"
        striped={true}
        bordered={true}
        hoverable={true}
        stickyHeader={true}
      />
    );
  },
};

// 정렬 기능 있는 테이블
export const WithSorting: Story = {
  render: () => {
    const [sortState, setSortState] = useState<SortState[]>([
      { column: "title", direction: "asc" },
    ]);

    const sortedData = [...mockQuizzes].sort((a, b) => {
      for (const sort of sortState) {
        const column = sort.column as keyof Quiz;
        const direction = sort.direction;

        if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
        if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    const handleSortChange = (newSortState: SortState[]) => {
      setSortState(newSortState);
    };

    return (
      <DataTable
        data={sortedData as Record<string, any>[]}
        columns={columns as unknown as DataTableColumn<Record<string, any>>[]}
        sortState={sortState}
        onSortChange={handleSortChange}
        size="md"
        striped={true}
        bordered={true}
        hoverable={true}
        stickyHeader={true}
      />
    );
  },
};

// 작업 버튼이 있는 테이블
export const WithActions: Story = {
  render: () => {
    const actionColumns: DataTableColumn<Record<string, any>>[] = [
      ...(columns as unknown as DataTableColumn<Record<string, any>>[]),
      {
        id: "actions",
        header: "작업",
        accessor: "id",
        width: 180,
        cell: (value, row) => (
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <Button size="sm" variant="outline">
              편집
            </Button>
            <Button size="sm" variant="outline" style={{ color: "red" }}>
              삭제
            </Button>
          </div>
        ),
      },
    ];

    return (
      <DataTable
        data={mockQuizzes as Record<string, any>[]}
        columns={actionColumns}
        size="md"
        striped={true}
        bordered={true}
        hoverable={true}
        stickyHeader={true}
      />
    );
  },
};

// 크기가 다른 테이블 예시
export const SizeVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div>
          <h3>Small Size</h3>
          <DataTable
            data={mockQuizzes as Record<string, any>[]}
            columns={
              columns as unknown as DataTableColumn<Record<string, any>>[]
            }
            size="sm"
            striped={true}
            bordered={true}
            hoverable={true}
            stickyHeader={true}
          />
        </div>
        <div>
          <h3>Medium Size (Default)</h3>
          <DataTable
            data={mockQuizzes as Record<string, any>[]}
            columns={
              columns as unknown as DataTableColumn<Record<string, any>>[]
            }
            size="md"
            striped={true}
            bordered={true}
            hoverable={true}
            stickyHeader={true}
          />
        </div>
        <div>
          <h3>Large Size</h3>
          <DataTable
            data={mockQuizzes as Record<string, any>[]}
            columns={
              columns as unknown as DataTableColumn<Record<string, any>>[]
            }
            size="lg"
            striped={true}
            bordered={true}
            hoverable={true}
            stickyHeader={true}
          />
        </div>
      </div>
    );
  },
};

// 상세 정보 확장 가능한 테이블
export const ExpandableRows: Story = {
  render: () => {
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const handleRowClick = (row: Record<string, any>) => {
      setExpandedRowId(expandedRowId === row.id ? null : row.id);
    };

    const rowRenderer = (
      row: Record<string, any>,
      index: number,
      cols: DataTableColumn<Record<string, any>>[]
    ) => {
      const quizRow = row as Quiz;
      const isExpanded = expandedRowId === quizRow.id;

      return (
        <>
          <tr
            key={quizRow.id}
            onClick={() => handleRowClick(quizRow)}
            className={isExpanded ? "selected" : ""}
            style={{ cursor: "pointer" }}
          >
            {cols.map((column) => {
              const value =
                typeof column.accessor === "function"
                  ? column.accessor(quizRow)
                  : quizRow[column.accessor as keyof Quiz];

              return (
                <td
                  key={column.id}
                  style={{
                    textAlign: column.align || "left",
                    padding: "12px 16px",
                  }}
                >
                  {column.cell ? column.cell(value, quizRow, index) : value}
                </td>
              );
            })}
          </tr>

          {isExpanded && (
            <tr>
              <td colSpan={cols.length} style={{ padding: "0" }}>
                <div
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "16px",
                    borderTop: "1px solid #eee",
                  }}
                >
                  <h4 style={{ margin: "0 0 8px 0" }}>퀴즈 상세 정보</h4>
                  <p>
                    <strong>퀴즈 ID:</strong> {quizRow.id}
                  </p>
                  <p>
                    <strong>퀴즈 제목:</strong> {quizRow.title}
                  </p>
                  <p>
                    <strong>카테고리:</strong> {quizRow.category}
                  </p>
                  <p>
                    <strong>문항 수:</strong> {quizRow.questions}개
                  </p>
                  <p>
                    <strong>작성자:</strong> {quizRow.author}
                  </p>
                  <p>
                    <strong>생성일:</strong> {quizRow.created}
                  </p>
                  <p>
                    <strong>상태:</strong>{" "}
                    <StatusBadge status={quizRow.status} />
                  </p>

                  <div style={{ marginTop: "16px" }}>
                    <Button variant="primary" size="sm">
                      퀴즈 관리
                    </Button>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </>
      );
    };

    return (
      <DataTable
        data={mockQuizzes as Record<string, any>[]}
        columns={columns as unknown as DataTableColumn<Record<string, any>>[]}
        rowRenderer={rowRenderer}
        size="md"
        striped={true}
        bordered={true}
        hoverable={true}
        stickyHeader={true}
      />
    );
  },
};

// 커스텀 필터가 있는 테이블
export const WithFilters: Story = {
  render: () => {
    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState<Quiz["status"] | "all">(
      "all"
    );

    const filteredData = mockQuizzes.filter((quiz) => {
      const matchesText =
        filterValue === "" ||
        quiz.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        quiz.author.toLowerCase().includes(filterValue.toLowerCase()) ||
        quiz.category.toLowerCase().includes(filterValue.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || quiz.status === statusFilter;

      return matchesText && matchesStatus;
    });

    const topComponent = (
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="퀴즈 제목, 작성자, 카테고리 검색..."
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
              fontSize: "14px",
            }}
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as Quiz["status"] | "all")
            }
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
              fontSize: "14px",
            }}
          >
            <option value="all">모든 상태</option>
            <option value="published">게시됨</option>
            <option value="draft">임시저장</option>
            <option value="archived">보관됨</option>
          </select>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={() => {
              setFilterValue("");
              setStatusFilter("all");
            }}
          >
            필터 초기화
          </Button>
        </div>
      </div>
    );

    return (
      <DataTable
        data={filteredData as Record<string, any>[]}
        columns={columns as unknown as DataTableColumn<Record<string, any>>[]}
        topComponent={topComponent}
        size="md"
        striped={true}
        bordered={true}
        hoverable={true}
        stickyHeader={true}
      />
    );
  },
};

// 그리드 레이아웃 테이블
export const GridLayout: Story = {
  args: {
    ...Default.args,
    useGridLayout: true,
  },
};

// 인피니트 스크롤 테이블
export const InfiniteScroll: Story = {
  render: () => {
    const [data, setData] = useState(mockMoreQuizzes.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);

      // 테스트용 지연
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const currentLength = data.length;
          const newItems = mockMoreQuizzes.slice(
            currentLength,
            currentLength + 5
          );

          if (newItems.length > 0) {
            setData((prev) => [...prev, ...newItems]);
          }

          if (currentLength + newItems.length >= mockMoreQuizzes.length) {
            setHasMore(false);
          }

          setIsLoading(false);
          resolve();
        }, 1000);
      });
    };

    return (
      <div
        style={{
          height: "200px",
        }}
      >
        <h3>인피니트 스크롤 데이터 테이블</h3>
        <p>아래 테이블을 스크롤하면 더 많은 데이터가 로드됩니다.</p>

        <DataTable
          data={data}
          columns={columns}
          isLoading={isLoading}
          hasNoMoreData={!hasMore}
          onLoadMore={handleLoadMore}
          infiniteScroll
          virtualScroll
          height={400}
          striped
          bordered
          hoverable
          stickyHeader
        />
      </div>
    );
  },
};

// 컬럼 토글이 가능한 테이블
export const ColumnToggle: Story = {
  args: {
    ...Default.args,
    columnToggle: true,
  },
};
