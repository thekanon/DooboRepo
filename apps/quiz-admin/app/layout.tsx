// apps/quiz-admin/src/app/layout.tsx
import React from "react";
import { AuthProvider } from "../lib/auth"; // 올바른 경로로 업데이트
import "./globals.css";

export const metadata = {
  title: "Quiz Admin - DooboRepo",
  description: "퀴즈 콘텐츠 관리 백오피스 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
