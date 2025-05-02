import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "@doo/common-ui";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Molecules/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    separator: {
      control: "text",
      description: "구분자 문자 또는 요소",
    },
    maxItems: {
      control: "number",
      description: "최대 표시 아이템 개수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// 기본 예제
export const Default: Story = {
  args: {
    items: [
      { label: "홈", href: "/" },
      { label: "블로그", href: "/blog" },
      { label: "MBTI 유형별 특징", href: "/blog/mbti-types" },
      { label: "INTJ 성격 특성", active: true },
    ],
  },
};

// 다양한 구분자 예제
export const DifferentSeparators: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "퀴즈", href: "/quizzes" },
          { label: "MBTI 테스트", active: true },
        ]}
        separator="/"
      />
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "퀴즈", href: "/quizzes" },
          { label: "MBTI 테스트", active: true },
        ]}
        separator=">"
      />
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "퀴즈", href: "/quizzes" },
          { label: "MBTI 테스트", active: true },
        ]}
        separator="•"
      />
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "퀴즈", href: "/quizzes" },
          { label: "MBTI 테스트", active: true },
        ]}
        separator={<span style={{ color: "#1890ff" }}>→</span>}
      />
    </div>
  ),
};

// 퀴즈 관리 Breadcrumb
export const QuizAdminBreadcrumb: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Breadcrumb
        items={[
          { label: "관리자 대시보드", href: "/admin" },
          { label: "퀴즈 관리", href: "/admin/quizzes" },
          { label: "퀴즈 편집", active: true },
        ]}
      />
      <Breadcrumb
        items={[
          { label: "관리자 대시보드", href: "/admin" },
          { label: "퀴즈 관리", href: "/admin/quizzes" },
          { label: "퀴즈 통계", href: "/admin/quizzes/stats" },
          { label: "인기 퀴즈 분석", active: true },
        ]}
      />
      <Breadcrumb
        items={[
          { label: "관리자 대시보드", href: "/admin" },
          { label: "퀴즈 관리", href: "/admin/quizzes" },
          { label: "퀴즈 생성", active: true },
        ]}
      />
    </div>
  ),
};

// 블로그 관련 Breadcrumb
export const BlogBreadcrumb: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "블로그", href: "/blog" },
          { label: "심리학", href: "/blog/category/psychology" },
          { label: "MBTI와 직업 선택: 당신의 성격 유형에 맞는 직업 찾기", active: true },
        ]}
      />
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "블로그", href: "/blog" },
          { label: "인기 게시글", href: "/blog/popular" },
          { label: "MBTI 테스트의 과학적 근거", active: true },
        ]}
        maxItems={3}
      />
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "블로그", href: "/blog" },
          { label: "작성자", href: "/blog/author" },
          { label: "김도움", href: "/blog/author/kimdoum" },
          { label: "MBTI 관련 글", active: true },
        ]}
        maxItems={4}
      />
    </div>
  ),
};

// 아이콘이 있는 Breadcrumb
export const WithIcons: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { 
          label: "홈", 
          href: "/", 
          icon: <span role="img" aria-label="홈">🏠</span> 
        },
        { 
          label: "퀴즈", 
          href: "/quizzes", 
          icon: <span role="img" aria-label="퀴즈">📝</span> 
        },
        { 
          label: "성격 테스트", 
          href: "/quizzes/personality", 
          icon: <span role="img" aria-label="성격">🧠</span> 
        },
        { 
          label: "MBTI 테스트", 
          active: true, 
          icon: <span role="img" aria-label="MBTI">📊</span> 
        },
      ]}
    />
  ),
};

// 긴 경로 Breadcrumb 처리
export const LongPathBreadcrumb: Story = {
  render: () => (
    <div style={{ maxWidth: "500px", border: "1px dashed #ddd", padding: "12px" }}>
      <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>좁은 화면에서 긴 경로 표시:</p>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "블로그", href: "/blog" },
          { label: "카테고리", href: "/blog/categories" },
          { label: "심리학", href: "/blog/categories/psychology" },
          { label: "MBTI", href: "/blog/categories/psychology/mbti" },
          { label: "성격 유형별 특징", href: "/blog/categories/psychology/mbti/personality-traits" },
          { label: "INTJ - 전략가형의 특성과 장단점 분석", active: true },
        ]}
        maxItems={4}
      />
    </div>
  ),
};

// 동적 Breadcrumb 예제
export const DynamicBreadcrumb: Story = {
  render: () => {
    // 실제 구현에서는 라우터 경로 등을 기반으로 생성하지만, 여기서는 예시로 제공
    const quizType = "MBTI";
    const quizId = "mbti-2025";
    const quizTitle = "당신의 진짜 MBTI는?";
    
    const dynamicItems = [
      { label: "퀴즈 목록", href: "/quizzes" },
      { label: `${quizType} 테스트`, href: `/quizzes/${quizType.toLowerCase()}` },
      { label: quizTitle, href: `/quizzes/${quizType.toLowerCase()}/${quizId}` },
      { label: "결과 분석", active: true },
    ];
    
    return (
      <div>
        <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
          동적으로 생성된 Breadcrumb (퀴즈 결과 페이지)
        </div>
        <Breadcrumb items={dynamicItems} />
      </div>
    );
  },
};

// 클릭 이벤트가 있는 Breadcrumb
export const WithClickHandlers: Story = {
  render: () => {
    const handleClick = (item: string) => {
      alert(`${item} 메뉴로 이동합니다`);
    };
    
    return (
      <Breadcrumb
        items={[
          { 
            label: "퀴즈 관리", 
            onClick: (e) => {
              e.preventDefault();
              handleClick("퀴즈 관리");
            }
          },
          { 
            label: "질문 관리", 
            onClick: (e) => {
              e.preventDefault();
              handleClick("질문 관리");
            }
          },
          { 
            label: "통계", 
            onClick: (e) => {
              e.preventDefault();
              handleClick("통계");
            }
          },
          { label: "응답자 분석", active: true },
        ]}
      />
    );
  },
};

// 비활성화된 항목이 있는 Breadcrumb
export const WithDisabledItems: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "관리자", href: "/admin" },
        { 
          label: "퀴즈 관리", 
          href: "/admin/quizzes",
          disabled: true, // 권한이 없는 메뉴를 비활성화
        },
        { label: "퀴즈 목록", href: "/admin/quizzes/list" },
        { label: "MBTI 테스트", active: true },
      ]}
    />
  ),
};