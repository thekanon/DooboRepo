import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { Icon } from "../atoms/Icon";
import { Button } from "../atoms/Button";
import styles from "./Modal.module.scss";
import { iconPaths } from "../../lib/icon";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  /**
   * 모달이 열려있는지 여부를 제어합니다
   */
  isOpen: boolean;

  /**
   * 모달이 닫힐 때 호출될 함수
   */
  onClose: () => void;

  /**
   * 모달 제목
   */
  title?: React.ReactNode;

  /**
   * 모달 내용
   */
  children: React.ReactNode;

  /**
   * 모달 크기
   * @default "md"
   */
  size?: ModalSize;

  /**
   * 모달 바깥쪽 클릭으로 닫기 가능 여부
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * ESC 키로 닫기 가능 여부
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * 모달 하단에 표시될 버튼들
   */
  footer?: React.ReactNode;

  /**
   * 모달 헤더 숨김 여부
   * @default false
   */
  hideHeader?: boolean;

  /**
   * 모달 닫기 버튼 숨김 여부
   * @default false
   */
  hideCloseButton?: boolean;

  /**
   * 모달 내용에 스크롤 적용 여부
   * @default true
   */
  scrollable?: boolean;

  /**
   * 모달 열림/닫힘 애니메이션 적용 여부
   * @default true
   */
  animated?: boolean;

  /**
   * 모달에 추가할 CSS 클래스
   */
  className?: string;

  /**
   * 모달 z-index 값 (기본값은 CSS에서 정의)
   */
  zIndex?: number;

  /**
   * 모달 헤더에 추가적인 요소
   */
  headerRight?: React.ReactNode;

  /**
   * 모달을 화면 중앙에 표시하지 않고 상단에 표시
   * @default false
   */
  positionTop?: boolean;

  /**
   * 모달 내용을 페이지로 표시
   * 모바일에서 전체 화면으로 표시되며 데스크톱에서는 큰 모달로 표시
   * @default false
   */
  asPage?: boolean;
}

// 명시적 타입 정의 없이 컴포넌트 구현
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footer,
  hideHeader = false,
  hideCloseButton = false,
  scrollable = true,
  animated = true,
  className,
  zIndex,
  headerRight,
  positionTop = false,
  asPage = false,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 브라우저 환경 감지
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // 모달 열림/닫힘 상태 변경 시 애니메이션 처리
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 방지
      setIsVisible(true);
    } else {
      if (animated) {
        setIsVisible(false);
        // 애니메이션 완료 후 스크롤 복원
        const timer = setTimeout(() => {
          document.body.style.overflow = "";
        }, 300);
        return () => clearTimeout(timer);
      } else {
        document.body.style.overflow = "";
        setIsVisible(false);
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, animated]);

  // ESC 키 이벤트 리스너
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  // 오버레이 클릭 핸들러
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalClasses = classNames(
    styles.modalContainer,
    {
      [styles.visible]: isVisible,
      [styles.animated]: animated,
      [styles.positionTop]: positionTop,
      [styles.asPage]: asPage,
    },
    className
  );

  const modalContentClasses = classNames(
    styles.modalContent,
    styles[`size-${size}`],
    {
      [styles.scrollable]: scrollable,
    }
  );

  // 브라우저 환경이 아니면 렌더링하지 않음
  if (!isMounted || !isOpen) return null;

  const modalContent = (
    <div
      className={modalClasses}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      style={zIndex ? { zIndex } : undefined}
    >
      <div className={modalContentClasses}>
        {!hideHeader && (
          <div className={styles.modalHeader}>
            {title && <h3 className={styles.modalTitle}>{title}</h3>}
            <div className={styles.modalHeaderRight}>
              {headerRight}
              {!hideCloseButton && (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <Icon size="sm">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </Icon>
                </button>
              )}
            </div>
          </div>
        )}

        <div className={styles.modalBody}>{children}</div>

        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );

  // Portal을 사용하여 body에 직접 렌더링 (타입 단언 사용)
  return createPortal(modalContent, document.body) as React.ReactElement;
};

Modal.displayName = "Modal";

// Default Footer 컴포넌트 제공
export interface ModalFooterProps {
  /**
   * 취소 버튼 텍스트
   * @default "취소"
   */
  cancelText?: string;

  /**
   * 확인 버튼 텍스트
   * @default "확인"
   */
  confirmText?: string;

  /**
   * 취소 버튼 클릭 핸들러
   */
  onCancel?: () => void;

  /**
   * 확인 버튼 클릭 핸들러
   */
  onConfirm?: () => void;

  /**
   * 확인 버튼 로딩 상태
   * @default false
   */
  confirmLoading?: boolean;

  /**
   * 취소 버튼 숨김 여부
   * @default false
   */
  hideCancelButton?: boolean;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 추가 버튼 및 요소
   */
  children?: React.ReactNode;
}

export const ModalFooter = ({
  cancelText = "취소",
  confirmText = "확인",
  onCancel,
  onConfirm,
  confirmLoading = false,
  hideCancelButton = false,
  className,
  children,
}: ModalFooterProps) => {
  const footerClasses = classNames(styles.defaultFooter, className);

  return (
    <div className={footerClasses}>
      {children}
      <div className={styles.buttonGroup}>
        {!hideCancelButton && (
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button
          variant="primary"
          onClick={onConfirm}
          isLoading={confirmLoading}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

ModalFooter.displayName = "ModalFooter";
