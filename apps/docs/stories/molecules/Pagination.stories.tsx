import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@doo/common-ui";

const meta: Meta<typeof Pagination> = {
  title: "Components/Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
      description: "현재 페이지 (1부터 시작)",
    },
    totalPages: {
      control: "number",
      description: "전체 페이지 수",
    },
    siblingCount: {
      control: "number",
      description: "현재 페이지 주변에 표시할 페이지 수",
    },
    showNavigationButtons: {
      control: "boolean",
      description: "이전/다음 페이지 이동 버튼 표시 여부",
    },
    showFirstLastButtons: {
      control: "boolean",
      description: "처음/마지막 페이지 이동 버튼 표시 여부",
    },
    showPageInfo: {
      control: "boolean",
      description: "페이지 정보 표시 여부",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "페이지네이션 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// 기본 페이지네이션
export const Default: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    onPageChange: (page) => console.log(`페이지 ${page}로 이동`),
  },
};

// 다양한 크기의 페이지네이션
export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Small Size:
        </div>
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
          size="sm"
        />
      </div>
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Medium Size (기본값):
        </div>
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
          size="md"
        />
      </div>
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          Large Size:
        </div>
        <Pagination
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
          size="lg"
        />
      </div>
    </div>
  ),
};

// 블로그 포스트 Pagination
export const BlogPostPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPosts = 87;
    const postsPerPage = 10;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    
    return (
      <div style={{ maxWidth: "800px" }}>
        <div style={{ 
          padding: "16px", 
          background: "#f9f9f9", 
          marginBottom: "16px", 
          borderRadius: "4px" 
        }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>MBTI 관련 블로그 포스트</h3>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px" 
          }}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{ 
                padding: "12px", 
                background: "white", 
                borderRadius: "4px", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
              }}>
                <div style={{ fontWeight: "bold" }}>MBTI 테스트와 직업 선택의 상관관계 {i + 1 + (currentPage - 1) * 5}</div>
                <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
                  작성일: 2025.04.{10 + i} | 조회수: {1000 - i * 50 + (currentPage - 1) * 200}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={postsPerPage}
          totalItems={totalPosts}
          onPageChange={(page) => setCurrentPage(page)}
          showPageInfo={true}
        />
      </div>
    );
  },
};

// 퀴즈 결과 Pagination
export const QuizResultPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalResults = 320;
    const resultsPerPage = 20;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    
    return (
      <div style={{ maxWidth: "800px" }}>
        <div style={{ 
          padding: "16px", 
          background: "#f0f7ff", 
          marginBottom: "16px", 
          borderRadius: "4px",
          border: "1px solid #d0e1fd" 
        }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>MBTI 퀴즈 응답 결과</h3>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px" 
          }}>
            <div style={{ fontSize: "14px", marginBottom: "8px" }}>
              총 참여자 수: {totalResults}명
            </div>
            
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{ 
                padding: "12px", 
                background: "white", 
                borderRadius: "4px", 
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ fontWeight: "bold" }}>참여자 {i + 1 + (currentPage - 1) * 5}</div>
                  <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
                    결과: {["INTJ", "ENFP", "ISFJ", "ESTP", "INFJ"][i]} | 참여일: 2025.04.{20 - i}
                  </div>
                </div>
                <div style={{ 
                  background: "#1890ff", 
                  color: "white", 
                  padding: "4px 8px", 
                  borderRadius: "4px",
                  alignSelf: "center",
                  fontSize: "14px"
                }}>
                  상세보기
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={resultsPerPage}
          totalItems={totalResults}
          onPageChange={(page) => setCurrentPage(page)}
          size="md"
          showPageInfo={true}
        />
      </div>
    );
  },
};

// 다양한 설정 옵션
export const ConfigOptions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          기본 설정:
        </div>
        <Pagination
          currentPage={5}
          totalPages={20}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
        />
      </div>
      
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          이전/다음 버튼만 표시:
        </div>
        <Pagination
          currentPage={5}
          totalPages={20}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
          showFirstLastButtons={false}
        />
      </div>
      
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          페이지 정보 숨김:
        </div>
        <Pagination
          currentPage={5}
          totalPages={20}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
          showPageInfo={false}
        />
      </div>
      
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          페이지 범위 조정 (siblingCount=1):
        </div>
        <Pagination
          currentPage={5}
          totalPages={20}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
          siblingCount={1}
        />
      </div>
      
      <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          페이지 범위 조정 (siblingCount=3):
        </div>
        <Pagination
          currentPage={5}
          totalPages={20}
          onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
          siblingCount={3}
        />
      </div>
    </div>
  ),
};

// 비활성화된 페이지네이션
export const DisabledPagination: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ fontSize: "14px", color: "#666" }}>
        데이터 로딩 중 또는 권한 없음 상태:
      </div>
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
        disabled={true}
      />
    </div>
  ),
};

// 적은 페이지 수의 페이지네이션
export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    return (
      <div style={{ maxWidth: "800px" }}>
        <div style={{ 
          padding: "16px", 
          background: "#f9f9f9", 
          marginBottom: "16px", 
          borderRadius: "4px" 
        }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>MBTI 테스트 단계</h3>
          <div style={{ 
            padding: "24px", 
            background: "white", 
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <div style={{ 
              fontSize: "18px", 
              fontWeight: "bold", 
              marginBottom: "16px" 
            }}>
              {[
                "1단계: 자기 인식",
                "2단계: 성격 특성 분석",
                "3단계: MBTI 유형 결정"
              ][currentPage - 1]}
            </div>
            <div style={{ fontSize: "16px" }}>
              {[
                "당신의 일상적인 행동과 생각을 떠올려보세요.",
                "응답에 따른 성격 특성을 분석 중입니다.",
                "당신의 MBTI 유형을 결정하고 있습니다."
              ][currentPage - 1]}
            </div>
          </div>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={(page) => setCurrentPage(page)}
          showPageInfo={true}
        />
      </div>
    );
  },
};

// 모바일 뷰 시뮬레이션
export const MobileView: Story = {
  render: () => (
    <div style={{ maxWidth: "320px", border: "1px dashed #ddd", padding: "16px" }}>
      <div style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        모바일 화면에서의 페이지네이션:
      </div>
      <Pagination
        currentPage={7}
        totalPages={20}
        onPageChange={(page) => console.log(`페이지 ${page}로 이동`)}
        size="sm"
      />
    </div>
  ),
};

// 커스텀 페이지 변경 핸들러
export const InteractivePagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesVisited, setPagesVisited] = useState<number[]>([1]);
    
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      if (!pagesVisited.includes(page)) {
        setPagesVisited([...pagesVisited, page]);
      }
    };
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ 
          padding: "16px", 
          background: "#f0f7ff", 
          borderRadius: "4px",
          fontSize: "14px" 
        }}>
          <div>현재 페이지: <strong>{currentPage}</strong></div>
          <div style={{ marginTop: "8px" }}>
            방문한 페이지: {pagesVisited.sort((a, b) => a - b).join(", ")}
          </div>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
        />
      </div>
    );
  },
};