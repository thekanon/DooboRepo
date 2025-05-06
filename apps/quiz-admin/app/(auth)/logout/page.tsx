"use client";

// apps/quiz-admin/src/app/(auth)/logout/page.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout, Button, Text, Alert, Icon } from "@doo/common-ui";
import { useAuth } from "../../../lib/auth";

export default function LogoutPage() {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  // 인증되지 않은 경우 로그인 페이지로 리디렉션
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // 카운트다운 효과
  useEffect(() => {
    if (countdown <= 0) {
      handleLogout();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      // 로그아웃 후 로그인 페이지로 이동
      router.push("/login");
    } catch (error) {
      setErrorMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // 취소하면 대시보드로 리디렉션
    router.push("/dashboard");
  };

  // 로그아웃 아이콘
  const logoutIcon = (
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
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
  );

  return (
    <AuthLayout
      logo={logoutIcon}
      title="로그아웃"
      subtitle="DooQuiz 관리 시스템에서 로그아웃하시겠습니까?"
      maxWidth="450px"
    >
      {errorMessage && (
        <Alert variant="error" title="오류" className="mb-6">
          {errorMessage}
        </Alert>
      )}

      <div className="text-center mb-8">
        <Text variant="body" color="secondary">
          {countdown > 0
            ? `${countdown}초 후 자동으로 로그아웃됩니다.`
            : "로그아웃 중입니다..."}
        </Text>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
          취소
        </Button>
        <Button variant="primary" onClick={handleLogout} isLoading={isLoading}>
          지금 로그아웃
        </Button>
      </div>

      <div className="mt-8 text-center">
        <Text variant="small" color="secondary">
          로그아웃하면 모든 세션이 종료됩니다.
        </Text>
      </div>
    </AuthLayout>
  );
}
