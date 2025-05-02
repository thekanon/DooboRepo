import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@doo/common-ui";

const meta: Meta<typeof IconButton> = {
  title: "Components/Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "danger"],
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    shape: {
      control: { type: "select" },
      options: ["circle", "square"],
      defaultValue: "circle",
    },
    isLoading: {
      control: "boolean",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * 기본 아이콘 버튼 예제입니다.
 */
export const Default: Story = {
  args: {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V20M4 12H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "추가하기",
  },
};

/**
 * 프라이머리 아이콘 버튼 예제입니다.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "다음",
  },
};

/**
 * 세컨더리 아이콘 버튼 예제입니다.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "이전",
  },
};

/**
 * 아웃라인 아이콘 버튼 예제입니다.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 12H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "수정하기",
  },
};

/**
 * 고스트 아이콘 버튼 예제입니다.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18L18 6M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "닫기",
  },
};

/**
 * 위험 아이콘 버튼 예제입니다.
 */
export const Danger: Story = {
  args: {
    variant: "danger",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 7L5 7M14 11L5 11M10 15H5M6 19L6 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "삭제하기",
  },
};

/**
 * 비활성화된 아이콘 버튼 예제입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V20M4 12H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "추가하기",
  },
};

/**
 * 로딩 상태 아이콘 버튼 예제입니다.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V20M4 12H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ariaLabel: "로딩 중",
  },
};

/**
 * 다양한 아이콘 버튼 크기를 보여주는 예제입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <IconButton
        size="sm"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        ariaLabel="Small 버튼"
      />
      <IconButton
        size="md"
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        ariaLabel="Medium 버튼"
      />
      <IconButton
        size="lg"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        ariaLabel="Large 버튼"
      />
    </div>
  ),
};

/**
 * 다양한 모양의 아이콘 버튼을 보여주는 예제입니다.
 */
export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <IconButton
        shape="circle"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        ariaLabel="원형 버튼"
      />
      <IconButton
        shape="square"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        ariaLabel="사각형 버튼"
      />
    </div>
  ),
};

/**
 * 모든 아이콘 버튼 변형을 보여주는 예제입니다.
 */
export const AllVariants: Story = {
  render: () => {
    const icon = (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4V20M4 12H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <IconButton variant="primary" icon={icon} ariaLabel="Primary" />
          <IconButton variant="secondary" icon={icon} ariaLabel="Secondary" />
          <IconButton variant="outline" icon={icon} ariaLabel="Outline" />
          <IconButton variant="ghost" icon={icon} ariaLabel="Ghost" />
          <IconButton variant="danger" icon={icon} ariaLabel="Danger" />
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <IconButton
            variant="primary"
            icon={icon}
            ariaLabel="Primary Disabled"
            disabled
          />
          <IconButton
            variant="secondary"
            icon={icon}
            ariaLabel="Secondary Disabled"
            disabled
          />
          <IconButton
            variant="outline"
            icon={icon}
            ariaLabel="Outline Disabled"
            disabled
          />
          <IconButton
            variant="ghost"
            icon={icon}
            ariaLabel="Ghost Disabled"
            disabled
          />
          <IconButton
            variant="danger"
            icon={icon}
            ariaLabel="Danger Disabled"
            disabled
          />
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <IconButton
            variant="primary"
            icon={icon}
            ariaLabel="Primary Loading"
            isLoading
          />
          <IconButton
            variant="secondary"
            icon={icon}
            ariaLabel="Secondary Loading"
            isLoading
          />
          <IconButton
            variant="outline"
            icon={icon}
            ariaLabel="Outline Loading"
            isLoading
          />
          <IconButton
            variant="ghost"
            icon={icon}
            ariaLabel="Ghost Loading"
            isLoading
          />
          <IconButton
            variant="danger"
            icon={icon}
            ariaLabel="Danger Loading"
            isLoading
          />
        </div>
      </div>
    );
  },
};

/**
 * 데이터 테이블 액션 버튼 예제입니다.
 */
export const DataTableActions = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const tableData = [
    { id: "1", name: "홍길동", status: "승인대기" },
    { id: "2", name: "김철수", status: "승인완료" },
    { id: "3", name: "이영희", status: "반려" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "400px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "16px",
          fontSize: "14px",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              이름
            </th>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "left",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              상태
            </th>
            <th
              style={{
                padding: "12px 16px",
                textAlign: "center",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              액션
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr
              key={row.id}
              style={{
                backgroundColor: selectedRow === row.id ? "#f0fdf4" : "white",
                cursor: "pointer",
              }}
              onClick={() => setSelectedRow(row.id)}
            >
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {row.name}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                    backgroundColor:
                      row.status === "승인대기"
                        ? "#eff6ff"
                        : row.status === "승인완료"
                          ? "#f0fdf4"
                          : "#fef2f2",
                    color:
                      row.status === "승인대기"
                        ? "#1d4ed8"
                        : row.status === "승인완료"
                          ? "#15803d"
                          : "#b91c1c",
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #e5e7eb",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 15L12 9M12 9L8.5 12.5M12 9L15.5 12.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    ariaLabel="상세보기"
                    shape="square"
                  />

                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 3.5L18 2L22 6L20.5 7.5M16.5 3.5L7 13L4 20L11 17L20.5 7.5M16.5 3.5L20.5 7.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    ariaLabel="수정하기"
                    shape="square"
                  />

                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9M21 7L14 7M10 7L3 7M7 7L7.0111 3.8782C7.0154 3.63906 7.04875 3.52427 7.10029 3.42814C7.21217 3.2 7.4142 3.03956 7.64824 3.00503C7.74841 2.98975 7.8608 3 8.0856 3H15.9144C16.1392 3 16.2516 2.98975 16.3518 3.00503C16.5858 3.03956 16.7878 3.2 16.8997 3.42814C16.9513 3.52427 16.9846 3.63906 16.9889 3.8782L17 7M12 11V17M9 11L9 17M15 11V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    ariaLabel="삭제하기"
                    shape="square"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            fontSize: "14px",
            color: "#525252",
          }}
        >
          선택된 행: {tableData.find((row) => row.id === selectedRow)?.name}
        </div>
      )}
    </div>
  );
};

/**
 * 토글 아이콘 버튼 예제입니다.
 */
export const ToggleIconButtons = () => {
  const [favorited, setFavorited] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "300px",
      }}
    >
      <div>
        <div
          style={{ fontSize: "14px", marginBottom: "8px", color: "#404040" }}
        >
          상호작용 가능한 아이콘 버튼:
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IconButton
              variant={favorited ? "primary" : "ghost"}
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={favorited ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4806 3.49883C11.6728 3.03685 12.3272 3.03685 12.5194 3.49883L14.6801 8.61924C14.7614 8.81809 14.9408 8.95359 15.1528 8.97824L20.7075 9.6358C21.2148 9.69931 21.4099 10.3166 21.0339 10.6426L16.976 14.1539C16.8055 14.3031 16.7312 14.5288 16.7795 14.7433L18.1529 20.1723C18.2715 20.6653 17.7437 21.0515 17.3026 20.7829L12.4796 17.9201C12.1887 17.7471 11.8113 17.7471 11.5204 17.9201L6.69744 20.7829C6.25629 21.0515 5.72854 20.6653 5.84715 20.1723L7.22049 14.7433C7.26883 14.5288 7.19045 14.3031 7.01998 14.1539L2.96214 10.6426C2.58608 10.3166 2.78116 9.69931 3.28849 9.6358L8.84321 8.97824C9.05519 8.95359 9.23462 8.81809 9.31589 8.61924L11.4806 3.49883Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              ariaLabel={favorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              onClick={() => setFavorited(!favorited)}
            />
            <span style={{ fontSize: "12px", color: "#525252" }}>
              {favorited ? "즐겨찾기됨" : "즐겨찾기"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IconButton
              variant={bookmark ? "primary" : "ghost"}
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={bookmark ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              ariaLabel={bookmark ? "북마크 해제" : "북마크 추가"}
              onClick={() => setBookmark(!bookmark)}
            />
            <span style={{ fontSize: "12px", color: "#525252" }}>
              {bookmark ? "저장됨" : "저장"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IconButton
              variant={liked ? "danger" : "ghost"}
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={liked ? "currentColor" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5 12.572L12.5726 19.5C12.2351 19.8375 11.7712 20.0087 11.29 20.0087C10.8088 20.0087 10.345 19.8375 10.0075 19.5L2.5 11.9925V2.5H11.9925L19.5 10.0075C19.8375 10.345 20.0087 10.8088 20.0087 11.29C20.0087 11.7712 19.8375 12.2351 19.5 12.572Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6H6.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              ariaLabel={liked ? "좋아요 해제" : "좋아요"}
              onClick={() => setLiked(!liked)}
            />
            <span style={{ fontSize: "12px", color: "#525252" }}>
              {liked ? "좋아요됨" : "좋아요"}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: expanded ? "16px" : "0",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px" }}>상세 정보</h3>
          <IconButton
            variant="ghost"
            size="sm"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            ariaLabel={expanded ? "접기" : "펼치기"}
            onClick={() => setExpanded(!expanded)}
          />
        </div>

        {expanded && (
          <div style={{ fontSize: "14px", color: "#525252" }}>
            이 섹션은 토글 버튼을 클릭하면 표시되거나 숨겨집니다. 아이콘 버튼의
            실제 활용 예제를 보여줍니다.
            <br />
            <br />
            아이콘 버튼은 공간을 절약하면서도 직관적인 UI를 제공할 수 있어
            대시보드나 데이터 테이블과 같은 UI에서 특히 유용합니다.
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 모달 제어를 위한 아이콘 버튼 예제입니다.
 */
export const ModalControlButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <IconButton
        variant="primary"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.6954 7.18536L11.6954 2.18536C11.8916 2.08709 12.1084 2.08709 12.3046 2.18536L21.3046 7.18536C21.5013 7.28364 21.625 7.48519 21.625 7.70477V16.2953C21.625 16.5148 21.5013 16.7164 21.3046 16.8147L12.3046 21.8147C12.1084 21.9129 11.8916 21.9129 11.6954 21.8147L2.6954 16.8147C2.4987 16.7164 2.375 16.5148 2.375 16.2953V7.70477C2.375 7.48519 2.4987 7.28364 2.6954 7.18536Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.625 7.5L12 12L21.375 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12V21.375"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 9.5V14.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        ariaLabel="메뉴 열기"
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "320px",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "16px", right: "16px" }}>
              <IconButton
                variant="ghost"
                size="sm"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                ariaLabel="모달 닫기"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <h3 style={{ marginTop: 0, marginBottom: "16px" }}>모달 제목</h3>
            <p
              style={{
                marginBottom: "24px",
                fontSize: "14px",
                color: "#525252",
              }}
            >
              이 모달은 아이콘 버튼을 클릭하여 열고 닫을 수 있습니다. 아이콘
              버튼이 모달, 드로어, 팝오버 등의 제어에 어떻게 사용될 수 있는지
              보여주는 예제입니다.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <IconButton
                variant="ghost"
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 12H5M5 12L12 19M5 12L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                ariaLabel="취소"
                onClick={() => setIsModalOpen(false)}
              />

              <IconButton
                variant="primary"
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L20 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                ariaLabel="확인"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
