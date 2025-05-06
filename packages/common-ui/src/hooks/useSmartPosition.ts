import { useEffect, useRef, RefObject, useState, MutableRefObject } from "react";

type PositionStrategy = "auto" | "left" | "right" | "top" | "bottom" | "center";
type HorizontalAlign = "left" | "right" | "center";
type VerticalAlign = "top" | "bottom" | "center";

interface SmartPositionOptions {
  /**
   * 기본 위치 전략
   * @default 'auto'
   */
  strategy?: PositionStrategy;

  /**
   * 수평 정렬 (left, right, center)
   * @default 'left'
   */
  horizontalAlign?: HorizontalAlign;

  /**
   * 수직 정렬 (top, bottom, center)
   * @default 'bottom'
   */
  verticalAlign?: VerticalAlign;

  /**
   * 타겟 엘리먼트로부터의 간격 (픽셀)
   * @default 8
   */
  offset?: number;

  /**
   * 뷰포트 경계로부터의 최소 간격 (픽셀)
   * @default 8
   */
  padding?: number;

  /**
   * 위치가 조정될 때 호출되는 콜백
   */
  onPositionChange?: (position: {
    x: number;
    y: number;
    horizontalAlign: HorizontalAlign;
    verticalAlign: VerticalAlign;
  }) => void;
}

interface SmartPositionResult {
  /**
   * 타겟 엘리먼트 참조를 저장할 ref 객체
   */
  targetRef: RefObject<HTMLElement | null>;

  /**
   * 팝업/메뉴 엘리먼트 참조를 저장할 ref 객체
   */
  popupRef: RefObject<HTMLElement | null>;

  /**
   * 계산된 위치 스타일 객체
   */
  style: React.CSSProperties;

  /**
   * 현재 위치 전략
   */
  currentPosition: {
    horizontalAlign: HorizontalAlign;
    verticalAlign: VerticalAlign;
  };

  /**
   * 위치 재계산 함수
   */
  updatePosition: () => void;
}

/**
 * 스마트 위치 조정을 위한 커스텀 훅
 *
 * @param isVisible 팝업/메뉴가 보이는지 여부
 * @param options 위치 조정 옵션
 * @returns 위치 조정을 위한 ref 객체와 스타일
 *
 * @example
 * ```tsx
 * const { targetRef, popupRef, style } = useSmartPosition(isOpen);
 *
 * return (
 *   <div ref={targetRef}>
 *     <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
 *     {isOpen && <div ref={popupRef} style={style}>Popup Content</div>}
 *   </div>
 * );
 * ```
 */
export function useSmartPosition(
  isVisible: boolean,
  options: SmartPositionOptions = {}
): SmartPositionResult {
  const {
    strategy = "auto",
    horizontalAlign = "left",
    verticalAlign = "bottom",
    offset = 8,
    padding = 8,
    onPositionChange,
  } = options;

  const targetRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLElement | null>(null);

  const [currentPosition, setCurrentPosition] = useState<{
    horizontalAlign: HorizontalAlign;
    verticalAlign: VerticalAlign;
  }>({
    horizontalAlign,
    verticalAlign,
  });

  const [style, setStyle] = useState<React.CSSProperties>({
    position: "absolute",
    zIndex: 1000,
  });

  // 위치 계산 함수
  const calculatePosition = () => {
    if (!targetRef.current || !popupRef.current || !isVisible) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const popupRect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalHorizontalAlign = horizontalAlign;
    let finalVerticalAlign = verticalAlign;
    let left: number | undefined;
    let top: number | undefined;
    let right: number | undefined;
    let bottom: number | undefined;

    // 자동 위치 조정 전략
    if (strategy === "auto") {
      // 수평 위치 결정
      const rightSpace = viewportWidth - targetRect.right;
      const leftSpace = targetRect.left;

      if (
        horizontalAlign === "left" &&
        leftSpace < popupRect.width &&
        rightSpace > leftSpace
      ) {
        finalHorizontalAlign = "right";
      } else if (
        horizontalAlign === "right" &&
        rightSpace < popupRect.width &&
        leftSpace > rightSpace
      ) {
        finalHorizontalAlign = "left";
      } else if (horizontalAlign === "center") {
        const centerOffset = (popupRect.width - targetRect.width) / 2;
        if (leftSpace < centerOffset || rightSpace < centerOffset) {
          finalHorizontalAlign = leftSpace > rightSpace ? "left" : "right";
        }
      }

      // 수직 위치 결정
      const bottomSpace = viewportHeight - targetRect.bottom;
      const topSpace = targetRect.top;

      if (
        verticalAlign === "bottom" &&
        bottomSpace < popupRect.height &&
        topSpace > bottomSpace
      ) {
        finalVerticalAlign = "top";
      } else if (
        verticalAlign === "top" &&
        topSpace < popupRect.height &&
        bottomSpace > topSpace
      ) {
        finalVerticalAlign = "bottom";
      } else if (verticalAlign === "center") {
        const centerOffset = (popupRect.height - targetRect.height) / 2;
        if (topSpace < centerOffset || bottomSpace < centerOffset) {
          finalVerticalAlign = topSpace > bottomSpace ? "top" : "bottom";
        }
      }
    }

    // 최종 위치 계산
    switch (finalHorizontalAlign) {
      case "left":
        left = 0;
        right = undefined;
        break;
      case "right":
        left = undefined;
        right = 0;
        break;
      case "center":
        const centerOffset = (popupRect.width - targetRect.width) / 2;
        left = -centerOffset;
        right = undefined;
        break;
    }

    switch (finalVerticalAlign) {
      case "top":
        top = undefined;
        bottom = targetRect.height + offset;
        break;
      case "bottom":
        top = targetRect.height + offset;
        bottom = undefined;
        break;
      case "center":
        const centerOffset = (targetRect.height - popupRect.height) / 2;
        top = centerOffset;
        bottom = undefined;
        break;
    }

    // 화면 밖으로 나가는지 확인 및 조정
    if (left !== undefined) {
      const rightEdge = targetRect.left + left + popupRect.width;
      if (rightEdge > viewportWidth - padding) {
        left = Math.max(
          padding - targetRect.left,
          viewportWidth - padding - popupRect.width - targetRect.left
        );
      }

      if (targetRect.left + left < padding) {
        left = padding - targetRect.left;
      }
    }

    if (right !== undefined) {
      const leftEdge = targetRect.right - right - popupRect.width;
      if (leftEdge < padding) {
        right = Math.max(
          padding - (viewportWidth - targetRect.right),
          targetRect.right - padding - popupRect.width
        );
      }

      if (viewportWidth - targetRect.right + right < padding) {
        right = padding - (viewportWidth - targetRect.right);
      }
    }

    if (top !== undefined) {
      const bottomEdge = targetRect.bottom + top;
      if (bottomEdge > viewportHeight - padding) {
        // 위쪽으로 표시하는 것이 더 적합한지 확인
        if (targetRect.top > popupRect.height + offset) {
          top = undefined;
          bottom = targetRect.height + offset;
          finalVerticalAlign = "top";
        } else {
          top = Math.max(
            0,
            viewportHeight - padding - popupRect.height - targetRect.top
          );
        }
      }
    }

    if (bottom !== undefined) {
      const topEdge = targetRect.top - bottom - popupRect.height;
      if (topEdge < padding) {
        // 아래쪽으로 표시하는 것이 더 적합한지 확인
        if (viewportHeight - targetRect.bottom > popupRect.height + offset) {
          top = targetRect.height + offset;
          bottom = undefined;
          finalVerticalAlign = "bottom";
        } else {
          bottom = Math.max(0, targetRect.top - padding - popupRect.height);
        }
      }
    }

    // 스타일 설정
    const newStyle: React.CSSProperties = {
      position: "absolute",
      zIndex: 1000,
      left,
      right,
      top,
      bottom,
    };

    setStyle(newStyle);
    setCurrentPosition({
      horizontalAlign: finalHorizontalAlign,
      verticalAlign: finalVerticalAlign,
    });

    if (onPositionChange) {
      onPositionChange({
        x: left !== undefined ? left : right !== undefined ? -right : 0,
        y: top !== undefined ? top : bottom !== undefined ? -bottom : 0,
        horizontalAlign: finalHorizontalAlign,
        verticalAlign: finalVerticalAlign,
      });
    }
  };

  // 위치 업데이트 트리거
  useEffect(() => {
    if (!isVisible) return;

    // 초기 위치 계산
    calculatePosition();

    // 창 크기 변경 시 위치 재계산
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition);
    };
  }, [isVisible]);

  // 의존성 변경 시 위치 재계산
  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [strategy, horizontalAlign, verticalAlign, offset, padding]);

  return {
    targetRef,
    popupRef,
    style,
    currentPosition,
    updatePosition: calculatePosition,
  };
}