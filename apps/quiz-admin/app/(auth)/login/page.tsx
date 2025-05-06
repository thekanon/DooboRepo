"use client";
import React, { useState, useRef } from "react";
import {
  AuthLayout,
  Button,
  Input,
  FormField,
  Form,
  Alert,
  Text,
  Icon,
  iconPaths,
} from "@doo/common-ui";
import { useAuth } from "../../../lib/auth";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // 폼 필드 참조를 위한 ref 생성
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    // FormSubmitEvent 타입의 이벤트 처리
    e.preventDefault();
    setError(null);
    // Form의 originalEvent에서 target을 가져옴
    const formElement = e.originalEvent.target as HTMLFormElement;
    console.log(formElement);
    const formData = new FormData(formElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      // 간단한 validation
      if (!email || !password) {
        console.log("handleSubmit");
        throw new Error("이메일과 비밀번호를 모두 입력해주세요!.");
      }
      await login(email, password);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다."
      );
    }
  };

  // 테스트 계정 자동 입력 함수
  const fillTestAccount = () => {
    if (emailInputRef.current) {
      emailInputRef.current.value = "admin@example.com";
    }
    if (passwordInputRef.current) {
      passwordInputRef.current.value = "password";
    }
  };

  return (
    <AuthLayout
      logo={<Icon size="lg">{iconPaths["lock-closed"]}</Icon>}
      title="DooQuiz 관리 시스템"
      subtitle="백오피스에 로그인하여 퀴즈 콘텐츠를 관리하세요."
      footer={
        <div className="text-center mt-6">
          <Text variant="caption" color="secondary">
            © {new Date().getFullYear()} DooboRepo. All rights reserved.
          </Text>
        </div>
      }
    >
      {error && (
        <Alert variant="error" title="로그인 실패" className="mb-6">
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <FormField label="이메일" required name="email">
          <Input
            type="email"
            name="email"
            placeholder="이메일 주소를 입력하세요"
            autoComplete="email"
            required
            ref={emailInputRef}
          />
        </FormField>
        <FormField label="비밀번호" required name="password">
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            required
            ref={passwordInputRef}
          />
        </FormField>
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center">
            <input type="checkbox" name="remember" className="mr-2" />
            <Text variant="small">로그인 상태 유지</Text>
          </label>
          <a
            href="#"
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            비밀번호 찾기
          </a>
        </div>
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          로그인
        </Button>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 ">
          <Text variant="small" color="secondary">
            테스트 계정: admin@example.com / password
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={fillTestAccount}
            type="button"
          >
            테스트 계정 입력
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
}
