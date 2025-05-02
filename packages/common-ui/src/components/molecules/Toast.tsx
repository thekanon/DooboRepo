// Toast.tsx - 최종 수정버전

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";
import { Icon } from "../atoms/Icon";
import styles from "./Toast.module.scss";
import { iconPaths } from "../../lib/icon";

export type ToastVariant = "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastProps {
  /**
   * 토스트 메시지 내용
   */
  children: React.ReactNode;

  /**
   * 토스트 타입
   * @default "info"
   */
  variant?: ToastVariant;

  /**
   * 토스트가 표시되는 위치
   * @default "top-right"
   */
  position?: ToastPosition;

  /**
   * 토스트가 자동으로 닫히는 지연 시간(ms)
   * 0이면 자동으로 닫히지 않음
   * @default 5000
   */
  autoClose?: number;

  /**
   * 토스트가 닫힐 때 호출되는 콜백 함수
   */
  onClose?: () => void;

  /**
   * 토스트 제목
   */
  title?: React.ReactNode;

  /**
   * 아이콘 표시 여부
   * @default true
   */
  showIcon?: boolean;

  /**
   * 진행 표시줄 표시 여부
   * @default true
   */
  showProgress?: boolean;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 토스트 ID (여러 개의 토스트를 관리할 때 사용)
   */
  id?: string;

  /**
   * 토스트 액션 버튼
   */
  action?: React.ReactNode;
}

export const Toast = ({
  children,
  variant = "info",
  position = "top-right",
  autoClose = 5000,
  onClose,
  title,
  showIcon = true,
  showProgress = true,
  className,
  id,
  action,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!autoClose || autoClose <= 0) return;

    // 자동 닫힘 타이머
    const timer = setTimeout(() => {
      handleClose();
    }, autoClose);

    // 진행률 업데이트 타이머
    let progressTimer: ReturnType<typeof setInterval>;
    if (showProgress) {
      const updateFrequency = 10; // 10ms마다 업데이트
      const step = (updateFrequency / autoClose) * 100;
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - step;
          return newProgress > 0 ? newProgress : 0;
        });
      }, updateFrequency);
    }

    return () => {
      clearTimeout(timer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [autoClose, showProgress, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // 페이드 아웃 애니메이션 후 실행
  };

  const getIcon = () => {
    switch (variant) {
      case "info":
        return "info-circle";
      case "success":
        return "check-circle";
      case "warning":
        return "exclamation-triangle";
      case "error":
        return "exclamation-circle";
      default:
        return "info-circle";
    }
  };

  const toastClasses = classNames(
    styles.toast,
    styles[`variant-${variant}`],
    styles[`position-${position}`],
    {
      [styles.visible]: isVisible,
    },
    className
  );

  // 브라우저 환경일 때만 Portal 사용
  if (!isMounted) return null;

  // Toast 컨테이너 생성 또는 가져오기
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = styles.toastContainer;
    document.body.appendChild(toastContainer);
  }

  return createPortal(
    <div className={toastClasses} role="alert" aria-live="assertive" id={id}>
      <div className={styles.toastContent}>
        {showIcon && (
          <div className={styles.iconContainer}>
            <Icon size="md" color={variant} className={styles.icon}>
              {iconPaths[getIcon()]} {/* name prop 대신 <path> */}
            </Icon>
          </div>
        )}
        <div className={styles.contentContainer}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.message}>{children}</div>
          {action && <div className={styles.action}>{action}</div>}
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close notification"
        >
          <Icon size="sm">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
            />
          </Icon>
        </button>
      </div>

      {showProgress && autoClose > 0 && (
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>,
    toastContainer
  ) as React.ReactElement;
};

Toast.displayName = "Toast";

// ToastController (토스트 관리를 위한 유틸리티)
type ToastOptions = Omit<ToastProps, "children" | "onClose">;

interface ToastInstance {
  id: string;
  onClose: () => void;
}

export class ToastController {
  private static toasts: ToastInstance[] = [];
  private static toastIdCounter = 0;

  static show(content: React.ReactNode, options?: ToastOptions): string {
    const id = `toast-${++this.toastIdCounter}`;

    // 여기서 실제 구현은 렌더링 로직에 따라 달라질 수 있음
    // 사용자 애플리케이션에서 전역 상태 관리 도구나 Context API를 사용하여 구현하세요

    // 이 부분은 개념적인 예시입니다
    return id;
  }

  static close(id: string): void {
    // 해당 ID의 토스트를 찾아 닫기
    const toastIndex = this.toasts.findIndex((toast) => toast.id === id);
    if (toastIndex !== -1) {
      const toast = this.toasts[toastIndex];
      toast.onClose();
      this.toasts.splice(toastIndex, 1);
    }
  }

  static closeAll(): void {
    // 모든 토스트 닫기
    [...this.toasts].forEach((toast) => {
      toast.onClose();
    });
    this.toasts = [];
  }
}
