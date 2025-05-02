import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarNavItem,
  SidebarFooter,
  Badge,
  InfoBox,
  Button,
} from "@doo/common-ui";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Organisms/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "text" },
      description: "사이드바 너비 (픽셀 또는 CSS 값)",
    },
    collapsedWidth: {
      control: { type: "text" },
      description: "접혔을 때 사이드바 너비 (픽셀 또는 CSS 값)",
    },
    isCollapsed: {
      control: "boolean",
      description: "사이드바 접기/펼치기 상태",
    },
    position: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "사이드바 위치",
    },
    fixed: {
      control: "boolean",
      description: "사이드바 고정 여부",
    },
    shadow: {
      control: "boolean",
      description: "사이드바 그림자 효과 여부",
    },
    bordered: {
      control: "boolean",
      description: "사이드바 테두리 여부",
    },
  },
  args: {
    width: "250px",
    collapsedWidth: "64px",
    isCollapsed: false,
    position: "left",
    fixed: false,
    shadow: true,
    bordered: true,
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// 아이콘 컴포넌트 모음
const icons = {
  dashboard: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  quiz: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  question: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  user: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  settings: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  analytics: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  blog: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  notification: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  logout: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  logo: (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

// 기본 사이드바
export const Default: Story = {
  render: (args) => {
    const [isCollapsed, setIsCollapsed] = useState(args.isCollapsed);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          {...args}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          userProfile={{
            name: "김도움",
            role: "관리자",
            email: "admin@example.com",
          }}
        >
          <SidebarSection title="메인">
            <SidebarNavItem
              id="dashboard"
              label="대시보드"
              href="#dashboard"
              icon={icons.dashboard}
              isActive={true}
            />
            <SidebarNavItem
              id="analytics"
              label="통계"
              href="#analytics"
              icon={icons.analytics}
            />
          </SidebarSection>

          <SidebarSection title="퀴즈 관리">
            <SidebarNavItem
              id="quizzes"
              label="퀴즈 목록"
              href="#quizzes"
              icon={icons.quiz}
              badge="12"
            />
            <SidebarNavItem
              id="questions"
              label="문항 관리"
              href="#questions"
              icon={icons.question}
            />
          </SidebarSection>

          <SidebarSection title="블로그 관리">
            <SidebarNavItem
              id="posts"
              label="게시글"
              href="#posts"
              icon={icons.blog}
            />
          </SidebarSection>

          <SidebarSection title="설정">
            <SidebarNavItem
              id="users"
              label="사용자 관리"
              href="#users"
              icon={icons.user}
            />
            <SidebarNavItem
              id="settings"
              label="시스템 설정"
              href="#settings"
              icon={icons.settings}
            />
          </SidebarSection>
        </Sidebar>

        <div style={{ flex: 1, padding: "24px", backgroundColor: "#f8f9fa" }}>
          <h1>퀴즈 관리 시스템</h1>
          <p>왼쪽 사이드바에서 메뉴를 선택하세요.</p>
          <p>사이드바 접기/펼치기를 테스트해보세요.</p>
        </div>
      </div>
    );
  },
};

// 퀴즈 관리 시스템 간소화 버전
export const QuizAdmin: Story = {
  render: (args) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("quizzes");

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const handleNavClick = (id: string) => {
      setActiveMenu(id);
    };

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          width="280px"
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          userProfile={{
            name: "김퀴즈",
            role: "퀴즈 관리자",
            email: "quiz@example.com",
          }}
          header={
            <SidebarHeader
              logo={icons.logo}
              title="DooMBTI 관리자"
              isCollapsed={isCollapsed}
              onToggleCollapse={handleToggleCollapse}
            />
          }
        >
          <SidebarSection title="대시보드">
            <SidebarNavItem
              id="dashboard"
              label="통계 개요"
              href="#dashboard"
              icon={icons.dashboard}
              isActive={activeMenu === "dashboard"}
              onClick={() => handleNavClick("dashboard")}
            />
          </SidebarSection>

          <SidebarSection title="퀴즈 관리">
            <SidebarNavItem
              id="quizzes"
              label="퀴즈 목록"
              href="#quizzes"
              icon={icons.quiz}
              badge="12"
              isActive={activeMenu === "quizzes"}
              onClick={() => handleNavClick("quizzes")}
            />

            <SidebarNavItem
              id="questions"
              label="문항 관리"
              href="#questions"
              icon={icons.question}
              isActive={activeMenu === "questions"}
              onClick={() => handleNavClick("questions")}
            />

            <SidebarNavItem
              id="question-create"
              label="문항 생성"
              href="#question-create"
              isActive={activeMenu === "question-create"}
              onClick={() => handleNavClick("question-create")}
            />

            <SidebarNavItem
              id="question-list"
              label="문항 목록"
              href="#question-list"
              isActive={activeMenu === "question-list"}
              onClick={() => handleNavClick("question-list")}
            />

            <SidebarNavItem
              id="results"
              label="퀴즈 결과 관리"
              href="#results"
              icon={icons.analytics}
              isActive={activeMenu === "results"}
              onClick={() => handleNavClick("results")}
            />
          </SidebarSection>

          <SidebarSection title="사용자">
            <SidebarNavItem
              id="users"
              label="사용자 관리"
              href="#users"
              icon={icons.user}
              isActive={activeMenu === "users"}
              onClick={() => handleNavClick("users")}
            />

            <SidebarNavItem
              id="user-stats"
              label="사용자 통계"
              href="#user-stats"
              icon={icons.analytics}
              isActive={activeMenu === "user-stats"}
              onClick={() => handleNavClick("user-stats")}
            />

            <SidebarNavItem
              id="quiz-stats"
              label="퀴즈 참여 통계"
              href="#quiz-stats"
              isActive={activeMenu === "quiz-stats"}
              onClick={() => handleNavClick("quiz-stats")}
            />
          </SidebarSection>

          <SidebarSection>
            <InfoBox
              variant="info"
              title="알림"
              size="sm"
              compact={true}
              bordered={false}
            >
              금일 플랫폼 점검이 예정되어 있습니다. (오후 11시 ~ 오전 2시)
            </InfoBox>
          </SidebarSection>
        </Sidebar>

        <div style={{ flex: 1, padding: "24px", backgroundColor: "#f8f9fa" }}>
          <h1>
            {activeMenu === "dashboard" && "대시보드"}
            {activeMenu === "quizzes" && "퀴즈 목록"}
            {activeMenu === "questions" && "문항 관리"}
            {activeMenu === "question-create" && "문항 생성"}
            {activeMenu === "question-list" && "문항 목록"}
            {activeMenu === "results" && "퀴즈 결과 관리"}
            {activeMenu === "users" && "사용자 관리"}
            {activeMenu === "user-stats" && "사용자 통계"}
            {activeMenu === "quiz-stats" && "퀴즈 참여 통계"}
          </h1>
          <p>선택된 메뉴: {activeMenu}</p>
          <p>사이드바 상태: {isCollapsed ? "접힘" : "펼침"}</p>
        </div>
      </div>
    );
  },
};

// 블로그 관리 시스템 간소화 버전
export const BlogAdmin: Story = {
  render: (args) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("posts");
    const [notifications, setNotifications] = useState(3);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const handleNavClick = (id: string) => {
      setActiveMenu(id);

      // 알림 클릭 시 알림 카운트 초기화
      if (id === "notifications") {
        setNotifications(0);
      }
    };

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          width="260px"
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          userProfile={{
            name: "김블로그",
            role: "블로그 에디터",
            email: "blog@doombti.com",
          }}
          header={
            <SidebarHeader
              logo={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              }
              title="DooMBTI 블로그"
              isCollapsed={isCollapsed}
              onToggleCollapse={handleToggleCollapse}
            />
          }
        >
          <SidebarSection title="콘텐츠 관리">
            <SidebarNavItem
              id="posts"
              label="게시글 관리"
              href="#posts"
              icon={icons.blog}
              isActive={activeMenu === "posts"}
              onClick={() => handleNavClick("posts")}
            />

            <SidebarNavItem
              id="drafts"
              label="임시 저장"
              href="#drafts"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              }
              badge="5"
              isActive={activeMenu === "drafts"}
              onClick={() => handleNavClick("drafts")}
            />

            <SidebarNavItem
              id="categories"
              label="카테고리"
              href="#categories"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              }
              isActive={activeMenu === "categories"}
              onClick={() => handleNavClick("categories")}
            />

            <SidebarNavItem
              id="tags"
              label="태그"
              href="#tags"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              }
              isActive={activeMenu === "tags"}
              onClick={() => handleNavClick("tags")}
            />
          </SidebarSection>

          <SidebarSection title="미디어">
            <SidebarNavItem
              id="media"
              label="미디어 라이브러리"
              href="#media"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              }
              isActive={activeMenu === "media"}
              onClick={() => handleNavClick("media")}
            />
          </SidebarSection>

          <SidebarSection title="통계">
            <SidebarNavItem
              id="analytics"
              label="방문자 분석"
              href="#analytics"
              icon={icons.analytics}
              isActive={activeMenu === "analytics"}
              onClick={() => handleNavClick("analytics")}
            />

            <SidebarNavItem
              id="comments"
              label="댓글 관리"
              href="#comments"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              }
              isActive={activeMenu === "comments"}
              onClick={() => handleNavClick("comments")}
            />
          </SidebarSection>

          <SidebarSection title="시스템">
            <SidebarNavItem
              id="settings"
              label="블로그 설정"
              href="#settings"
              icon={icons.settings}
              isActive={activeMenu === "settings"}
              onClick={() => handleNavClick("settings")}
            />

            <SidebarNavItem
              id="notifications"
              label="알림"
              href="#notifications"
              icon={icons.notification}
              badge={notifications > 0 ? notifications.toString() : undefined}
              isActive={activeMenu === "notifications"}
              onClick={() => handleNavClick("notifications")}
            />
          </SidebarSection>

          <SidebarSection>
            <InfoBox
              variant="warning"
              title="백업 일정"
              size="sm"
              compact={true}
            >
              다음 백업: 오늘 오후 6시
            </InfoBox>
          </SidebarSection>
        </Sidebar>

        <div style={{ flex: 1, padding: "24px", backgroundColor: "#f8f9fa" }}>
          <h1>
            {activeMenu === "posts" && "게시글 관리"}
            {activeMenu === "drafts" && "임시 저장된 게시글"}
            {activeMenu === "categories" && "카테고리 관리"}
            {activeMenu === "tags" && "태그 관리"}
            {activeMenu === "media" && "미디어 라이브러리"}
            {activeMenu === "analytics" && "방문자 분석"}
            {activeMenu === "comments" && "댓글 관리"}
            {activeMenu === "settings" && "블로그 설정"}
            {activeMenu === "notifications" && "알림 센터"}
          </h1>

          <div style={{ marginTop: "20px" }}>
            {activeMenu === "posts" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <h2>게시글 목록</h2>
                  <Button variant="primary">새 게시글</Button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        제목
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        카테고리
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        작성일
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        조회수
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        상태
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        MBTI 성격 유형의 통계적 유효성 분석
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        심리학
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        2025-04-28
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        1,245
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#e6f7ff",
                            color: "#1890ff",
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          게시됨
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "center",
                          }}
                        >
                          <Button size="sm" variant="outline">
                            편집
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "red" }}
                          >
                            삭제
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        DooMBTI와 다른 성격 테스트의 비교
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        테스트
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        2025-04-25
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        982
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#e6f7ff",
                            color: "#1890ff",
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          게시됨
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "center",
                          }}
                        >
                          <Button size="sm" variant="outline">
                            편집
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "red" }}
                          >
                            삭제
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        직장에서 MBTI 활용하기
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        커리어
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        2025-04-20
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        756
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#fff7e6",
                            color: "#fa8c16",
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          초안
                        </span>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "8px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "center",
                          }}
                        >
                          <Button size="sm" variant="outline">
                            편집
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "red" }}
                          >
                            삭제
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeMenu === "notifications" && (
              <div>
                <h2>알림 센터</h2>
                <InfoBox title="시스템 유지보수" variant="info">
                  2025년 5월 1일 오전 2시부터 4시까지 시스템 유지보수가 예정되어
                  있습니다.
                </InfoBox>
                <div style={{ height: "16px" }}></div>
                <InfoBox title="댓글 알림" variant="success">
                  "MBTI 성격 유형의 통계적 유효성 분석" 게시글에 새로운 댓글이
                  달렸습니다.
                </InfoBox>
                <div style={{ height: "16px" }}></div>
                <InfoBox title="백업 완료" variant="success">
                  데이터베이스 백업이 성공적으로 완료되었습니다.
                </InfoBox>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

// 오른쪽 사이드바
export const RightSidebar: Story = {
  args: {
    position: "right",
  },
  render: (args) => {
    const [isCollapsed, setIsCollapsed] = useState(args.isCollapsed);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <div style={{ flex: 1, padding: "24px", backgroundColor: "#f8f9fa" }}>
          <h1>오른쪽 사이드바</h1>
          <p>사이드바가 오른쪽에 위치한 레이아웃 예시입니다.</p>
          <p>관리자 설정, 알림, 사용자 정보 등을 표시하는 데 적합합니다.</p>
        </div>

        <Sidebar
          {...args}
          position="right"
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          userProfile={{
            name: "김도움",
            role: "관리자",
            email: "admin@example.com",
          }}
        >
          <SidebarSection title="알림">
            <SidebarNavItem
              id="notifications"
              label="알림 센터"
              href="#notifications"
              icon={icons.notification}
              badge="3"
              isActive={true}
            />
          </SidebarSection>

          <SidebarSection title="계정">
            <SidebarNavItem
              id="profile"
              label="내 프로필"
              href="#profile"
              icon={icons.user}
            />
            <SidebarNavItem
              id="settings"
              label="설정"
              href="#settings"
              icon={icons.settings}
            />
            <SidebarNavItem
              id="logout"
              label="로그아웃"
              href="#logout"
              icon={icons.logout}
            />
          </SidebarSection>

          <SidebarSection title="최근 활동">
            <InfoBox variant="info" title="퀴즈 편집" size="sm" compact={true}>
              MBTI 유형별 특징 퀴즈를 10분 전에 편집했습니다.
            </InfoBox>
            <div style={{ height: "8px" }}></div>
            <InfoBox
              variant="success"
              title="게시글 발행"
              size="sm"
              compact={true}
            >
              새로운 블로그 포스트가 발행되었습니다.
            </InfoBox>
          </SidebarSection>
        </Sidebar>
      </div>
    );
  },
};

// 다크 테마 사이드바
export const DarkTheme: Story = {
  render: (args) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const handleNavClick = (id: string) => {
      setActiveMenu(id);
    };

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <div
          style={{
            width: isCollapsed ? "84px" : "260px",
            backgroundColor: "#1a1c23",
            color: "#e3e3e3",
            borderRight: "1px solid #2d3748",
            transition: "width 0.3s ease",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2d3748",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ color: "#6366f1" }}>{icons.quiz}</div>
              {!isCollapsed && (
                <h2 style={{ margin: 0, fontSize: "18px", color: "white" }}>
                  DooMBTI Admin
                </h2>
              )}
            </div>
            <button
              onClick={handleToggleCollapse}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              {isCollapsed ? ">>" : "<<"}
            </button>
          </div>

          {/* 메인 콘텐츠 */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            {/* 섹션: 대시보드 */}
            <div style={{ marginBottom: "24px" }}>
              {!isCollapsed && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#a0aec0",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  대시보드
                </div>
              )}
              <a
                href="#dashboard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: activeMenu === "dashboard" ? "white" : "#a0aec0",
                  backgroundColor:
                    activeMenu === "dashboard" ? "#2c3e50" : "transparent",
                  transition: "all 0.2s ease",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("dashboard");
                }}
              >
                <span>{icons.dashboard}</span>
                {!isCollapsed && <span>대시보드</span>}
              </a>
            </div>

            {/* 섹션: 퀴즈 관리 */}
            <div style={{ marginBottom: "24px" }}>
              {!isCollapsed && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#a0aec0",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  퀴즈 관리
                </div>
              )}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <a
                  href="#quizzes"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: activeMenu === "quizzes" ? "white" : "#a0aec0",
                    backgroundColor:
                      activeMenu === "quizzes" ? "#2c3e50" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("quizzes");
                  }}
                >
                  <span>{icons.quiz}</span>
                  {!isCollapsed && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span>퀴즈 목록</span>
                      <span
                        style={{
                          backgroundColor: "#6366f1",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                        }}
                      >
                        12
                      </span>
                    </div>
                  )}
                </a>
                <a
                  href="#questions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: activeMenu === "questions" ? "white" : "#a0aec0",
                    backgroundColor:
                      activeMenu === "questions" ? "#2c3e50" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("questions");
                  }}
                >
                  <span>{icons.question}</span>
                  {!isCollapsed && <span>문항 관리</span>}
                </a>
                <a
                  href="#results"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: activeMenu === "results" ? "white" : "#a0aec0",
                    backgroundColor:
                      activeMenu === "results" ? "#2c3e50" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("results");
                  }}
                >
                  <span>{icons.analytics}</span>
                  {!isCollapsed && <span>결과 분석</span>}
                </a>
              </div>
            </div>

            {/* 섹션: 설정 */}
            <div>
              {!isCollapsed && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#a0aec0",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  설정
                </div>
              )}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <a
                  href="#settings"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: activeMenu === "settings" ? "white" : "#a0aec0",
                    backgroundColor:
                      activeMenu === "settings" ? "#2c3e50" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("settings");
                  }}
                >
                  <span>{icons.settings}</span>
                  {!isCollapsed && <span>설정</span>}
                </a>
                <a
                  href="#users"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: activeMenu === "users" ? "white" : "#a0aec0",
                    backgroundColor:
                      activeMenu === "users" ? "#2c3e50" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("users");
                  }}
                >
                  <span>{icons.user}</span>
                  {!isCollapsed && <span>사용자</span>}
                </a>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #2d3748",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                ...(isCollapsed
                  ? { flexWrap: "wrap", placeContent: "center" }
                  : {}),
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                KD
              </div>
              {!isCollapsed && (
                <div>
                  <div style={{ fontWeight: "bold", color: "white" }}>
                    김도움
                  </div>
                  <div style={{ fontSize: "12px", color: "#a0aec0" }}>
                    관리자
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "24px", backgroundColor: "#f8f9fa" }}>
          <h1>다크 테마 사이드바</h1>
          <p>커스텀 스타일링이 적용된 다크 테마 사이드바 예시입니다.</p>
          <p>선택된 메뉴: {activeMenu}</p>
        </div>
      </div>
    );
  },
};

// 커스텀 푸터를 가진 사이드바
export const WithCustomFooter: Story = {
  render: (args) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const handleNavClick = (id: string) => {
      setActiveMenu(id);
    };

    return (
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar
          width="260px"
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          fixed={false}
          header={
            <SidebarHeader
              logo={
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title="DooMBTI 관리자"
              isCollapsed={isCollapsed}
              onToggleCollapse={handleToggleCollapse}
            />
          }
        >
          <SidebarSection title="대시보드">
            <SidebarNavItem
              id="dashboard"
              label="통계 개요"
              href="#dashboard"
              icon={icons.dashboard}
              isActive={activeMenu === "dashboard"}
              onClick={() => handleNavClick("dashboard")}
            />
            <SidebarNavItem
              id="reports"
              label="월간 리포트"
              href="#reports"
              icon={icons.analytics}
              isActive={activeMenu === "reports"}
              onClick={() => handleNavClick("reports")}
            />
          </SidebarSection>

          <SidebarSection title="퀴즈 관리">
            <SidebarNavItem
              id="quizzes"
              label="퀴즈 목록"
              href="#quizzes"
              icon={icons.quiz}
              isActive={activeMenu === "quizzes"}
              onClick={() => handleNavClick("quizzes")}
            />
            <SidebarNavItem
              id="questions"
              label="문항 관리"
              href="#questions"
              icon={icons.question}
              isActive={activeMenu === "questions"}
              onClick={() => handleNavClick("questions")}
            />
          </SidebarSection>

          {/* 사이드바 푸터 커스텀 구현 */}
          <SidebarFooter isCollapsed={isCollapsed}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: isCollapsed ? "8px 0" : "8px 0",
              }}
            >
              {/* 사용자 정보 영역 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#f5f7fa",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#4f46e5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  KA
                </div>

                {!isCollapsed && (
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>
                      김관리자
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      admin@doombti.com
                    </div>
                  </div>
                )}
              </div>

              {/* 하단 버튼 그룹 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: isCollapsed ? "center" : "space-between",
                  padding: "0 16px",
                }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavClick("settings")}
                  style={{
                    flex: isCollapsed ? "none" : 1,
                    marginRight: isCollapsed ? 0 : "8px",
                  }}
                >
                  {isCollapsed ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  ) : (
                    "설정"
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLogoutModalOpen(true)}
                  style={{ flex: isCollapsed ? "none" : 1 }}
                >
                  {isCollapsed ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  ) : (
                    "로그아웃"
                  )}
                </Button>
              </div>

              {/* 버전 정보 */}
              {!isCollapsed && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#9ca3af",
                    marginTop: "8px",
                  }}
                >
                  DooMBTI Admin v1.5.2
                </div>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>

        <div style={{ flex: 1, padding: "24px", backgroundColor: "#f8f9fa" }}>
          <h1>커스텀 푸터를 가진 사이드바</h1>
          <p>
            SidebarFooter 컴포넌트를 활용하여 다양한 컨텐츠를 표시하는
            예시입니다.
          </p>
          <p>
            이 예시에서는 사용자 프로필, 버튼 그룹, 버전 정보 등을 푸터에
            배치했습니다.
          </p>
          <p>선택된 메뉴: {activeMenu}</p>

          {isLogoutModalOpen && (
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
                  backgroundColor: "white",
                  padding: "24px",
                  borderRadius: "8px",
                  width: "400px",
                  maxWidth: "90%",
                }}
              >
                <h2 style={{ marginTop: 0 }}>로그아웃</h2>
                <p>정말 로그아웃 하시겠습니까?</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                    marginTop: "16px",
                  }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setIsLogoutModalOpen(false)}
                  >
                    취소
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setIsLogoutModalOpen(false)}
                  >
                    로그아웃
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};
