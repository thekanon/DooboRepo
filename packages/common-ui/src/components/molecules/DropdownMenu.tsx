import { ReactNode, useState, useEffect } from "react";
import classNames from "classnames";
import { useSmartPosition } from "../../hooks/useSmartPosition";
import styles from "./DropdownMenu.module.scss";

export interface DropdownMenuProps {
  /**
   * 트리거 요소 (버튼, 아이콘 등)
   */
  trigger: ReactNode;

  /**
   * 메뉴 내용
   */
  children: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 메뉴 컨테이너 추가 CSS 클래스
   */
  menuClassName?: string;

  /**
   * 메뉴 기본 위치 (auto, left, right, top, bottom, center)
   * @default 'auto'
   */
  position?: "auto" | "left" | "right" | "top" | "bottom" | "center";

  /**
   * 수평 정렬 (left, right, center)
   * @default 'left'
   */
  horizontalAlign?: "left" | "right" | "center";

  /**
   * 수직 정렬 (top, bottom, center)
   * @default 'bottom'
   */
  verticalAlign?: "top" | "bottom" | "center";

  /**
   * 트리거로부터의 간격 (픽셀)
   * @default 8
   */
  offset?: number;

  /**
   * 메뉴가 열려있는 상태인지 여부 (controlled component로 사용할 경우)
   */
  isOpen?: boolean;

  /**
   * 메뉴 상태 변경 핸들러 (controlled component로 사용할 경우)
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * 외부 클릭 시 메뉴를 닫을지 여부
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * ESC 키 누를 시 메뉴를 닫을지 여부
   * @default true
   */
  closeOnEsc?: boolean;
}

/**
 * 스마트 위치 조정 기능을 가진 재사용 가능한 드롭다운 메뉴 컴포넌트
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  className,
  menuClassName,
  position = "auto",
  horizontalAlign = "left",
  verticalAlign = "bottom",
  offset = 8,
  isOpen: controlledIsOpen,
  onOpenChange,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}) => {
  // 내부 상태 (uncontrolled mode) 또는 외부 상태 사용 (controlled mode)
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // 메뉴 토글 핸들러
  const toggleMenu = () => {
    const newState = !isOpen;
    if (onOpenChange) {
      onOpenChange(newState);
    } else {
      setInternalIsOpen(newState);
    }
  };

  // 스마트 위치 조정 훅 사용
  const { targetRef, popupRef, style } = useSmartPosition(isOpen, {
    strategy: position,
    horizontalAlign,
    verticalAlign,
    offset,
  });

  // 외부 클릭 핸들러
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      closeOnOutsideClick &&
      isOpen &&
      targetRef.current &&
      popupRef.current &&
      !targetRef.current.contains(e.target as Node) &&
      !popupRef.current.contains(e.target as Node)
    ) {
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        setInternalIsOpen(false);
      }
    }
  };

  // ESC 키 핸들러
  const handleEscKey = (e: KeyboardEvent) => {
    if (closeOnEsc && isOpen && e.key === "Escape") {
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        setInternalIsOpen(false);
      }
    }
  };

  // 이벤트 리스너 등록
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, closeOnOutsideClick, closeOnEsc]);

  return (
    <div
      className={classNames(styles.dropdownContainer, className)}
      ref={targetRef as React.RefObject<HTMLDivElement>}
    >
      <div className={styles.dropdownTrigger} onClick={toggleMenu}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={classNames(styles.dropdownMenu, menuClassName)}
          style={style}
          ref={popupRef as React.RefObject<HTMLDivElement>}
        >
          {children}
        </div>
      )}
    </div>
  );
};
