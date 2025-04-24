import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@doo/common-ui";

const meta: Meta<typeof Avatar> = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    shape: {
      control: { type: "select" },
      options: ["circle", "square"],
      defaultValue: "circle",
    },
    status: {
      control: { type: "select" },
      options: ["none", "online", "offline", "away", "busy"],
      defaultValue: "none",
    },
    src: {
      control: "text",
    },
    initials: {
      control: "text",
    },
    bgColor: {
      control: "color",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * 기본 아바타 예제입니다.
 */
export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/300?img=1",
    size: "md",
  },
};

/**
 * 이미지가 없을 때 이니셜을 표시하는 아바타입니다.
 */
export const WithInitials: Story = {
  args: {
    initials: "김도봉",
    size: "md",
  },
};

/**
 * 다양한 크기의 아바타 예제입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar size="xs" src="https://i.pravatar.cc/300?img=2" />
      <Avatar size="sm" src="https://i.pravatar.cc/300?img=3" />
      <Avatar size="md" src="https://i.pravatar.cc/300?img=4" />
      <Avatar size="lg" src="https://i.pravatar.cc/300?img=5" />
      <Avatar size="xl" src="https://i.pravatar.cc/300?img=6" />
    </div>
  ),
};

/**
 * 다양한 형태의 아바타 예제입니다.
 */
export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar shape="circle" src="https://i.pravatar.cc/300?img=7" />
      <Avatar shape="square" src="https://i.pravatar.cc/300?img=8" />
    </div>
  ),
};

/**
 * 다양한 상태를 표시하는 아바타 예제입니다.
 */
export const Statuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Avatar status="online" src="https://i.pravatar.cc/300?img=11" />
        <span style={{ fontSize: "12px" }}>온라인</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Avatar status="offline" src="https://i.pravatar.cc/300?img=12" />
        <span style={{ fontSize: "12px" }}>오프라인</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Avatar status="away" src="https://i.pravatar.cc/300?img=13" />
        <span style={{ fontSize: "12px" }}>자리비움</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Avatar status="busy" src="https://i.pravatar.cc/300?img=14" />
        <span style={{ fontSize: "12px" }}>다른용무중</span>
      </div>
    </div>
  ),
};

/**
 * 이니셜 및 배경색 커스터마이징 예제입니다.
 */
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar initials="김철수" bgColor="#3b82f6" />
      <Avatar initials="이영희" bgColor="#ef4444" />
      <Avatar initials="박지민" bgColor="#22c55e" />
      <Avatar initials="정민수" bgColor="#f59e0b" />
      <Avatar initials="황지안" bgColor="#8b5cf6" />
    </div>
  ),
};

/**
 * 실제 이미지 대신 이니셜을 사용한 예제입니다.
 */
export const InitialsExamples: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar initials="John Doe" />
      <Avatar initials="Alice Smith" />
      <Avatar initials="Bob Johnson" />
      <Avatar initials="Carol Williams" />
      <Avatar initials="David Brown" />
    </div>
  ),
};

/**
 * 팀 멤버를 표시하는 아바타 그룹 예제입니다.
 */
export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>개발팀</h3>
        <div style={{ display: "flex" }}>
          {["김개발", "이백엔드", "박프론트", "정디자인", "최기획"].map(
            (name, index) => (
              <div
                key={name}
                style={{
                  marginLeft: index === 0 ? 0 : "-8px",
                  border: "2px solid white",
                  borderRadius: "50%",
                  zIndex: 5 - index,
                }}
              >
                <Avatar
                  initials={name}
                  size="md"
                  status={index === 0 ? "online" : "none"}
                />
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>마케팅팀</h3>
        <div style={{ display: "flex" }}>
          {["홍마케팅", "장콘텐츠", "임소셜", "한그로스", "오디자인"].map(
            (name, index) => (
              <div
                key={name}
                style={{
                  marginLeft: index === 0 ? 0 : "-8px",
                  border: "2px solid white",
                  borderRadius: "50%",
                  zIndex: 5 - index,
                }}
              >
                <Avatar
                  initials={name}
                  size="md"
                  status={index === 1 ? "busy" : "none"}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  ),
};

/**
 * 백오피스 퀴즈 관리 사용자 프로필 예제입니다.
 */
export const QuizAdminProfile: Story = {
  render: () => (
    <div
      style={{
        width: "320px",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Avatar
          src="https://i.pravatar.cc/300?img=20"
          size="lg"
          status="online"
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: "16px" }}>김퀴즈마스터</div>
          <div style={{ color: "#737373", fontSize: "14px" }}>퀴즈 관리자</div>
        </div>
      </div>

      <div style={{ fontSize: "14px", color: "#525252", marginBottom: "16px" }}>
        <div style={{ marginBottom: "8px" }}>
          <strong>마지막 접속:</strong> 방금 전
        </div>
        <div>
          <strong>관리 퀴즈:</strong> 124개
        </div>
      </div>

      <div style={{ fontSize: "14px", fontWeight: 500, color: "#1890ff" }}>
        프로필 보기
      </div>
    </div>
  ),
};

/**
 * 사용자 활동 로그 예제입니다.
 */
export const ActivityLog: Story = {
  render: () => {
    const activities = [
      {
        user: "박관리자",
        action: "새 퀴즈를 생성했습니다.",
        time: "5분 전",
        status: "online" as const,
      },
      {
        user: "이에디터",
        action: "MBTI 퀴즈를 수정했습니다.",
        time: "30분 전",
        status: "busy" as const,
      },
      {
        user: "김승인자",
        action: "3개의 퀴즈를 승인했습니다.",
        time: "1시간 전",
        status: "away" as const,
      },
      {
        user: "최통계",
        action: "월간 리포트를 다운로드했습니다.",
        time: "3시간 전",
        status: "offline" as const,
      },
    ];

    return (
      <div
        style={{
          width: "380px",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          background: "white",
        }}
      >
        <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: 600 }}>
          최근 활동
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {activities.map((activity, index) => (
            <div key={index} style={{ display: "flex", gap: "12px" }}>
              <Avatar
                initials={activity.user}
                size="sm"
                status={activity.status}
              />
              <div>
                <div style={{ fontSize: "14px" }}>
                  <span style={{ fontWeight: 600 }}>{activity.user}</span>{" "}
                  <span>{activity.action}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#737373" }}>
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
