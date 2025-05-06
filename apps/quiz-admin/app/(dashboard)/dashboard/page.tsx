"use client";

// apps/quiz-admin/src/app/(dashboard)/dashboard/page.tsx
import React from "react";
import { useAuth } from "../../../lib/auth";
import { Button, Card, Text } from "@doo/common-ui";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">대시보드</h1>
        <Text color="secondary">
          퀴즈 관리 시스템의 주요 정보를 한눈에 확인하세요.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">등록된 퀴즈</h3>
            <Text color="secondary" className="mb-4">
              총 퀴즈 수량
            </Text>
            <div className="text-3xl font-bold">124</div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">활성 카테고리</h3>
            <Text color="secondary" className="mb-4">
              퀴즈 카테고리 수
            </Text>
            <div className="text-3xl font-bold">8</div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">최근 생성</h3>
            <Text color="secondary" className="mb-4">
              지난 7일간 생성된 퀴즈
            </Text>
            <div className="text-3xl font-bold">12</div>
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">사용자 정보</h2>
          <div className="mb-4">
            <strong>이름:</strong> {user?.name || "로딩 중..."}
          </div>
          <div className="mb-4">
            <strong>이메일:</strong> {user?.email || "로딩 중..."}
          </div>
          <div className="mb-4">
            <strong>권한:</strong> {user?.role || "로딩 중..."}
          </div>
          <Button variant="outline" onClick={logout}>
            로그아웃
          </Button>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">최근 활동</h2>
          <ul className="space-y-2">
            <li className="p-2 border-b">
              <div className="font-medium">퀴즈 추가: MBTI 유형별 특징</div>
              <Text variant="small" color="secondary">
                2025-04-29 14:32:41
              </Text>
            </li>
            <li className="p-2 border-b">
              <div className="font-medium">카테고리 수정: 심리학</div>
              <Text variant="small" color="secondary">
                2025-04-28 11:15:22
              </Text>
            </li>
            <li className="p-2 border-b">
              <div className="font-medium">퀴즈 삭제: 구버전 유형 테스트</div>
              <Text variant="small" color="secondary">
                2025-04-27 09:45:18
              </Text>
            </li>
            <li className="p-2">
              <div className="font-medium">시스템 로그인</div>
              <Text variant="small" color="secondary">
                2025-04-27 09:30:05
              </Text>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
