"use client";

// apps/quiz-admin/src/app/(dashboard)/layout.tsx
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../lib/auth";
import {
  DashboardLayout,
  Spinner,
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarNavItem,
  SidebarFooter,
  InfoBox,
  Icon,
} from "@doo/common-ui";

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
  category: (
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

// 헤더 컴포넌트
const Header = () => (
  <div className="h-full flex items-center justify-between px-6">
    <div className="font-bold text-lg">DooQuiz 관리 시스템</div>
    <div className="flex items-center gap-4">
      <div className="cursor-pointer">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>
      <div className="cursor-pointer">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </div>
    </div>
  </div>
);

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // 사이드바 상태 관리
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // 현재 경로에 따라 활성 메뉴 설정
  useEffect(() => {
    if (pathname?.includes("/dashboard")) {
      setActiveMenu("dashboard");
    } else if (pathname?.includes("/quizzes")) {
      setActiveMenu("quizzes");
    } else if (pathname?.includes("/questions")) {
      setActiveMenu("questions");
    } else if (pathname?.includes("/categories")) {
      setActiveMenu("categories");
    } else if (pathname?.includes("/users")) {
      setActiveMenu("users");
    } else if (pathname?.includes("/analytics")) {
      setActiveMenu("analytics");
    } else if (pathname?.includes("/settings")) {
      setActiveMenu("settings");
    }
  }, [pathname]);

  // 사이드바 토글 핸들러
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 메뉴 클릭 핸들러
  const handleNavClick = (id: string) => {
    setActiveMenu(id);
    // 메뉴에 따라 라우팅
    router.push(`/${id}`);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    router.push("/logout");
  };

  // 인증 확인
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
        <span className="ml-2">인증 상태 확인 중...</span>
      </div>
    );
  }

  // 인증되지 않은 경우 null 반환 (useEffect에서 리디렉션 처리)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout
      header={<Header />}
      sidebar={
        <Sidebar
          width="280px"
          collapsedWidth="64px"
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          userProfile={{
            name: user?.name || "관리자",
            role: user?.role || "관리자",
            email: user?.email || "admin@example.com",
          }}
          header={
            <SidebarHeader
              logo={icons.logo}
              title="DooQuiz 관리자"
              isCollapsed={isCollapsed}
              onToggleCollapse={handleToggleCollapse}
            />
          }
        >
          <SidebarSection title="대시보드">
            <SidebarNavItem
              id="dashboard"
              label="통계 개요"
              href="/dashboard"
              icon={icons.dashboard}
              isActive={activeMenu === "dashboard"}
              onClick={() => handleNavClick("dashboard")}
            />
          </SidebarSection>

          <SidebarSection title="퀴즈 관리">
            <SidebarNavItem
              id="quizzes"
              label="퀴즈 목록"
              href="/quizzes"
              icon={icons.quiz}
              badge="12"
              isActive={activeMenu === "quizzes"}
              onClick={() => handleNavClick("quizzes")}
            />

            <SidebarNavItem
              id="questions"
              label="문항 관리"
              href="/questions"
              icon={icons.question}
              isActive={activeMenu === "questions"}
              onClick={() => handleNavClick("questions")}
            />

            <SidebarNavItem
              id="categories"
              label="카테고리 관리"
              href="/categories"
              icon={icons.category}
              isActive={activeMenu === "categories"}
              onClick={() => handleNavClick("categories")}
            />

            <SidebarNavItem
              id="analytics"
              label="퀴즈 통계"
              href="/analytics"
              icon={icons.analytics}
              isActive={activeMenu === "analytics"}
              onClick={() => handleNavClick("analytics")}
            />
          </SidebarSection>

          <SidebarSection title="사용자">
            <SidebarNavItem
              id="users"
              label="사용자 관리"
              href="/users"
              icon={icons.user}
              isActive={activeMenu === "users"}
              onClick={() => handleNavClick("users")}
            />
          </SidebarSection>

          <SidebarSection title="시스템">
            <SidebarNavItem
              id="settings"
              label="시스템 설정"
              href="/settings"
              icon={icons.settings}
              isActive={activeMenu === "settings"}
              onClick={() => handleNavClick("settings")}
            />

            <SidebarNavItem
              id="logout"
              label="로그아웃"
              href="/logout"
              icon={icons.logout}
              isActive={false}
              onClick={handleLogout}
            />
          </SidebarSection>
          {!isCollapsed && (
            <SidebarSection>
              <InfoBox
                variant="info"
                title="알림"
                size="sm"
                compact={true}
                bordered={false}
              >
                DooQuiz 시스템이 업데이트 되었습니다. (V1.0.2)
              </InfoBox>
            </SidebarSection>
          )}
        </Sidebar>
      }
    >
      {children}
    </DashboardLayout>
  );
}
