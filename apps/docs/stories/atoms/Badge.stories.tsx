import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Badge, Avatar, Button } from "@doo/common-ui";

const meta: Meta<typeof Badge> = {
  title: "Components/Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "error", "info"],
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    rounded: {
      control: "boolean",
      defaultValue: false,
    },
    dot: {
      control: "boolean",
      defaultValue: false,
    },
    count: {
      control: "number",
    },
    max: {
      control: "number",
      defaultValue: 99,
    },
    show: {
      control: "boolean",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * 기본 배지 예제입니다.
 */
export const Default: Story = {
  args: {
    children: "New",
    variant: "primary",
    size: "md",
  },
};

/**
 * 카운트 배지 예제입니다.
 */
export const Count: Story = {
  args: {
    count: 5,
    variant: "primary",
    size: "md",
  },
};

/**
 * 다양한 변형의 배지 예제입니다.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

/**
 * 다양한 크기의 배지 예제입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

/**
 * 둥근 배지 예제입니다.
 */
export const Rounded: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge count={8} rounded />
      <Badge count={16} variant="success" rounded />
      <Badge count={24} variant="error" rounded />
    </div>
  ),
};

/**
 * 다른 요소에 오버레이된 배지 예제입니다.
 */
export const Overlay: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge count={5} content={<Avatar size="md" initials="김도봉" />} />
      <Badge
        dot
        variant="error"
        content={<Avatar size="md" initials="이퀴즈" />}
      />
      <Badge
        count={99}
        max={99}
        content={<Avatar size="md" initials="박관리" />}
      />
    </div>
  ),
};

/**
 * 점 표시 배지 예제입니다.
 */
export const Dot: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge dot variant="primary" />
      <Badge dot variant="success" />
      <Badge dot variant="warning" />
      <Badge dot variant="error" />
      <Badge dot variant="info" />
    </div>
  ),
};

/**
 * 다양한 요소에 적용된 배지 예제입니다.
 */
export const WithDifferentElements: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Badge count={3} content={<Button variant="primary">메시지</Button>} />

        <Badge
          dot
          variant="error"
          content={<Button variant="secondary">알림</Button>}
        />
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Badge
          count={8}
          content={
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                  stroke="#737373"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12H8.01M12 12H12.01M16 12H16.01"
                  stroke="#737373"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
        />

        <Badge
          dot
          variant="success"
          content={
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="#737373"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
        />
      </div>
    </div>
  ),
};

/**
 * 백오피스 퀴즈 관리에 적용 예제입니다.
 */
export const QuizAdminExample: Story = {
  render: () => (
    <div
      style={{
        width: "360px",
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        background: "white",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>
          퀴즈 관리자 대시보드
        </h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              background: "#f8f9fa",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#737373",
                marginBottom: "8px",
              }}
            >
              새 퀴즈
            </div>
            <div style={{ fontSize: "24px", fontWeight: 600 }}>
              <Badge
                count={5}
                variant="primary"
                offset={[0, 3]}
                content={<span>12</span>}
              />
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              background: "#f8f9fa",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#737373",
                marginBottom: "8px",
              }}
            >
              승인 대기
            </div>
            <div style={{ fontSize: "24px", fontWeight: 600 }}>
              <Badge
                count={3}
                variant="warning"
                offset={[0, 3]}
                content={<span>8</span>}
              />
            </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              background: "#f8f9fa",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#737373",
                marginBottom: "8px",
              }}
            >
              문제 신고
            </div>
            <div style={{ fontSize: "24px", fontWeight: 600 }}>
              <Badge
                count={2}
                variant="error"
                offset={[0, 3]}
                content={<span>3</span>}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <h4 style={{ fontSize: "14px", fontWeight: 600 }}>최근 활동</h4>
          <span style={{ fontSize: "12px", color: "#1890ff" }}>모두 보기</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderRadius: "4px",
              background: "#f8f9fa",
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Badge
                dot
                variant="success"
                content={
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      background: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                    }}
                  >
                    Q
                  </div>
                }
              />
              <span style={{ fontSize: "14px" }}>MBTI 성격 테스트</span>
            </div>
            <span style={{ fontSize: "12px", color: "#737373" }}>방금 전</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderRadius: "4px",
              background: "#f8f9fa",
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Badge
                dot
                variant="warning"
                content={
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      background: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                    }}
                  >
                    Q
                  </div>
                }
              />
              <span style={{ fontSize: "14px" }}>직업 적성 검사</span>
            </div>
            <span style={{ fontSize: "12px", color: "#737373" }}>2시간 전</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderRadius: "4px",
              background: "#f8f9fa",
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "4px",
                  background: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                Q
              </div>
              <span style={{ fontSize: "14px" }}>영화 취향 테스트</span>
            </div>
            <span style={{ fontSize: "12px", color: "#737373" }}>어제</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 실시간 알림 시스템 예제입니다.
 */
export const NotificationSystem: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState({
      messages: 3,
      alerts: 5,
      updates: 2,
    });

    const clearNotification = (type: keyof typeof notifications) => {
      setNotifications((prev) => ({
        ...prev,
        [type]: 0,
      }));
    };

    const addNotification = (type: keyof typeof notifications) => {
      setNotifications((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    };

    return (
      <div style={{ width: "320px", padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
            padding: "8px 16px",
            borderRadius: "8px",
            background: "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <Badge
              count={notifications.messages}
              show={notifications.messages > 0}
              variant="primary"
              content={
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => clearNotification("messages")}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    addNotification("messages");
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                      stroke="#525252"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 9L12 12L17 9"
                      stroke="#525252"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 9V15.5H17V9"
                      stroke="#525252"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              }
            />

            <Badge
              count={notifications.alerts}
              show={notifications.alerts > 0}
              variant="error"
              content={
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => clearNotification("alerts")}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    addNotification("alerts");
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.7275C3.45395 16.4549 3.90574 16.0503 4.80932 15.2412L5.40265 14.7076C5.7592 14.3919 5.93748 14.2341 6.06922 14.0154C6.20096 13.7967 6.27586 13.5437 6.42566 13.0376L8.00195 8M15.0019 17H18.3975C19.656 17 20.2852 17 20.4176 16.7275C20.55 16.4549 20.0982 16.0503 19.1946 15.2412L18.6013 14.7076C18.2447 14.3919 18.0664 14.2341 17.9347 14.0154C17.8029 13.7967 17.728 13.5437 17.5782 13.0376L16.0019 8M9.00195 17V17.5C9.00195 18.6046 9.8974 19.5 11.002 19.5H13.002C14.1065 19.5 15.0019 18.6046 15.0019 17.5V17M9.00195 17H15.0019M12.002 5V3M15.002 6L16.4162 4.58579M9.00195 6L7.58773 4.58579"
                      stroke="#525252"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              }
            />

            <Badge
              count={notifications.updates}
              show={notifications.updates > 0}
              variant="success"
              content={
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => clearNotification("updates")}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    addNotification("updates");
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6566 12C20.1566 15 18.5235 19 14.9999 19C13.9 19 12.5 18.5 12 18L7.99994 19L8.99994 15C3.49994 10 8.99993 4 12.9999 4C14.9999 4 16.1379 5 17.6566 7"
                      stroke="#525252"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.5 11.5C14.5 11.5 16 12.5 16 13"
                      stroke="#525252"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              }
            />
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#737373",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            오른쪽 클릭: 알림 추가 / 왼쪽 클릭: 알림 제거
          </div>
        </div>
      </div>
    );
  },
};
