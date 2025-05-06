// apps/quiz-admin/src/lib/auth/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// 기본값은 undefined로 설정하고 컨텍스트 내부에서 실제 값 제공
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 상태 확인 (로컬 스토리지에서 인증 정보 로드)
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      try {
        // 클라이언트 사이드에서만 localStorage에 접근
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("auth_token");
          const userInfo = localStorage.getItem("user_info");

          if (token && userInfo) {
            setUser(JSON.parse(userInfo));
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("인증 상태 확인 오류:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 인증 상태에 따른 리디렉션
  useEffect(() => {
    if (isLoading) return;

    const authRoutes = ["/login", "/register", "/forgot-password"];
    const isAuthRoute = authRoutes.some((route) => pathname?.startsWith(route));

    if (!user && !isAuthRoute && pathname !== "/") {
      // 인증되지 않은 사용자가 보호된 경로에 접근하려고 할 때
      router.push("/login");
    } else if (user && isAuthRoute) {
      // 이미 인증된 사용자가 인증 관련 페이지에 접근하려고 할 때
      router.push("/dashboard");
    }
  }, [user, isLoading, pathname, router]);

  // 로그인 함수
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // 실제 구현에서는 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 임시 로그인 처리 (테스트 계정)
      if (email === "admin@example.com" && password === "password") {
        const userData = {
          name: "관리자",
          email: "admin@example.com",
          role: "admin",
        };

        localStorage.setItem("auth_token", "dummy_token");
        localStorage.setItem("user_info", JSON.stringify(userData));
        setUser(userData);

        router.push("/dashboard");
      } else {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth 훅 - 이 훅을 통해 컴포넌트에서 인증 컨텍스트에 접근
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
