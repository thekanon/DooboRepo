// apps/quiz-admin/app/dashboard/page.tsx
"use client";

import React from "react";
import {
  DashboardLayout,
  DataTableLayout,
  Card,
  Button,
  Input,
} from "@doo/common-ui";

// 임시 아이콘 컴포넌트
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// Header, Sidebar, Footer 컴포넌트 (실제 구현은 별도 파일로 분리하는 것이 좋음)
const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 h-full">
      <div className="font-bold text-xl">퀴즈 관리자</div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          알림
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-primary-700 text-sm font-medium">AD</span>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="h-full py-6">
      <div className="px-6 mb-8">
        <div className="text-lg font-semibold mb-2">QuizMaster</div>
        <div className="text-neutral-500 text-sm">관리자 대시보드</div>
      </div>

      <div className="space-y-1 px-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary-50 text-primary-700">
          <div className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span className="font-medium">대시보드</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-600 hover:bg-neutral-100">
          <div className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          </div>
          <span>퀴즈 관리</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-600 hover:bg-neutral-100">
          <div className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <span>사용자 관리</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-600 hover:bg-neutral-100">
          <div className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <span>통계 분석</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-neutral-600 hover:bg-neutral-100">
          <div className="w-5 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <span>설정</span>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="text-center text-neutral-500 text-sm">
      © 2025 QuizMaster Admin Dashboard. All rights reserved.
    </div>
  );
};

// 실제 데이터 (실제 구현에서는 API를 통해 가져올 것)
const recentQuizzesData = [
  {
    id: 1,
    title: "자바스크립트 기초",
    category: "프로그래밍",
    status: "활성",
    questions: 15,
    created: "2025-04-18",
  },
  {
    id: 2,
    title: "리액트 심화",
    category: "프로그래밍",
    status: "활성",
    questions: 20,
    created: "2025-04-17",
  },
  {
    id: 3,
    title: "세계 지리 퀴즈",
    category: "지리",
    status: "비활성",
    questions: 25,
    created: "2025-04-15",
  },
  {
    id: 4,
    title: "AI 및 기계학습",
    category: "기술",
    status: "활성",
    questions: 18,
    created: "2025-04-10",
  },
  {
    id: 5,
    title: "영화 퀴즈",
    category: "엔터테인먼트",
    status: "검토중",
    questions: 30,
    created: "2025-04-08",
  },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <DashboardLayout
      header={<Header />}
      sidebar={<Sidebar />}
      footer={<Footer />}
    >
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-neutral-900">대시보드</h1>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="총 퀴즈"
            shadow="md"
            borderRadius="lg"
            padded={true}
            footer={
              <div className="text-xs text-neutral-500">
                지난 달보다 12% 증가
              </div>
            }
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-3xl font-bold text-primary-700">312</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                <ChartIcon />
              </div>
            </div>
          </Card>

          <Card
            title="등록 사용자"
            shadow="md"
            borderRadius="lg"
            padded={true}
            footer={
              <div className="text-xs text-neutral-500">
                신규 사용자 24명 (오늘)
              </div>
            }
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-3xl font-bold text-success-700">4,328</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-success-50 flex items-center justify-center text-success-500">
                <UsersIcon />
              </div>
            </div>
          </Card>

          <Card
            title="퀴즈 참여"
            shadow="md"
            borderRadius="lg"
            padded={true}
            footer={
              <div className="text-xs text-neutral-500">
                지난 7일간 12,842회 참여
              </div>
            }
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-3xl font-bold text-info-700">187,624</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-info-50 flex items-center justify-center text-info-500">
                <ClockIcon />
              </div>
            </div>
          </Card>
        </div>

        {/* 최근 퀴즈 목록 */}
        <DataTableLayout
          title="최근 등록된 퀴즈"
          actions={
            <Button variant="primary" size="md">
              <div className="flex items-center gap-2">
                <PlusIcon />
                <span>새 퀴즈 만들기</span>
              </div>
            </Button>
          }
          filters={
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-64">
                <Input
                  placeholder="퀴즈 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  prefix={<div>{<SearchIcon />}</div>}
                  fullWidth
                />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  필터
                </Button>
                <Button variant="ghost" size="sm">
                  초기화
                </Button>
              </div>
            </div>
          }
          table={
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neutral-50">
                    <th className="p-3 text-left text-sm font-semibold text-neutral-600">
                      ID
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-neutral-600">
                      제목
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-neutral-600">
                      카테고리
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-neutral-600">
                      질문 수
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-neutral-600">
                      상태
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-neutral-600">
                      등록일
                    </th>
                    <th className="p-3 text-left text-sm font-semibold text-neutral-600">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {recentQuizzesData.map((quiz) => (
                    <tr key={quiz.id} className="hover:bg-neutral-50">
                      <td className="p-3 text-sm text-neutral-800">
                        {quiz.id}
                      </td>
                      <td className="p-3 text-sm text-neutral-800 font-medium">
                        {quiz.title}
                      </td>
                      <td className="p-3 text-sm text-neutral-600">
                        {quiz.category}
                      </td>
                      <td className="p-3 text-sm text-neutral-600">
                        {quiz.questions}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            quiz.status === "활성"
                              ? "bg-success-100 text-success-800"
                              : quiz.status === "비활성"
                                ? "bg-neutral-100 text-neutral-800"
                                : "bg-warning-100 text-warning-800"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-neutral-600">
                        {quiz.created}
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Button variant="secondary" size="sm">
                            편집
                          </Button>
                          <Button variant="ghost" size="sm">
                            보기
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
          pagination={
            <div className="flex justify-between items-center w-full px-4">
              <div className="text-sm text-neutral-500">
                총 312개 항목 중 1-5개 표시
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" disabled>
                  이전
                </Button>
                <Button variant="primary" size="sm">
                  1
                </Button>
                <Button variant="ghost" size="sm">
                  2
                </Button>
                <Button variant="ghost" size="sm">
                  3
                </Button>
                <Button variant="ghost" size="sm">
                  다음
                </Button>
              </div>
            </div>
          }
        />

        {/* 그래프와 통계 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="퀴즈 카테고리 분포" shadow="md" borderRadius="lg">
            <div className="h-72 flex items-center justify-center">
              <div className="text-neutral-400">이 곳에 차트가 표시됩니다</div>
            </div>
          </Card>

          <Card title="최근 활동" shadow="md" borderRadius="lg">
            <div className="space-y-4 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <PlusIcon />
                </div>
                <div>
                  <div className="text-sm font-medium">새 퀴즈 등록됨</div>
                  <div className="text-xs text-neutral-500">
                    {`'AI 및 기계학습' 퀴즈가 추가되었습니다.`}
                  </div>

                  <div className="text-xs text-neutral-400 mt-1">10분 전</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center text-success-700">
                  <UsersIcon />
                </div>
                <div>
                  <div className="text-sm font-medium">새 사용자 등록</div>
                  <div className="text-xs text-neutral-500">
                    김철수님이 가입했습니다.
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">25분 전</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center text-warning-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">퀴즈 수정 필요</div>
                  <div className="text-xs text-neutral-500">
                    {`'세계 지리 퀴즈'에 오류가 보고되었습니다.`}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">1시간 전</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
