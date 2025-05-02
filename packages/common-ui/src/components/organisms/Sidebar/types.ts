import { ReactNode } from "react";

/**
 * 사이드바에서 사용하는 네비게이션 아이템 타입
 */
export interface SidebarNavItemProps {
  /**
   * 네비게이션 아이템의 고유 ID
   */
  id: string;

  /**
   * 아이템 레이블/이름
   */
  label: string;

  /**
   * 아이템 링크(href)
   */
  href?: string;

  /**
   * 아이템 아이콘 (React 노드)
   */
  icon?: ReactNode;

  /**
   * 아이템 뱃지 (보통 숫자나 상태 표시)
   */
  badge?: string | number;

  /**
   * 아이템 활성화 여부
   */
  isActive?: boolean;

  /**
   * 아이템 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;

  /**
   * 하위 아이템 목록 (중첩 메뉴)
   */
  children?: SidebarNavItemProps[];

  /**
   * 중첩 메뉴가 열려있는지 여부
   */
  isOpen?: boolean;
}

/**
 * 사이드바 섹션 타입
 */
export interface SidebarSectionProps {
  /**
   * 섹션 제목
   */
  title?: string;

  /**
   * 섹션 컨텐츠
   */
  children: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * 사이드바 헤더 타입
 */
export interface SidebarHeaderProps {
  /**
   * 로고 이미지 또는 아이콘
   */
  logo?: ReactNode;

  /**
   * 타이틀 텍스트
   */
  title?: string;

  /**
   * 추가 헤더 요소
   */
  children?: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 사이드바 접기/펼치기 상태
   */
  isCollapsed?: boolean;

  /**
   * 사이드바 접기/펼치기 토글 함수
   */
  onToggleCollapse?: () => void;
}

/**
 * 사이드바 푸터 타입
 */
export interface SidebarFooterProps {
  /**
   * 푸터 컨텐츠
   */
  children?: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 사이드바 접기/펼치기 상태
   */
  isCollapsed?: boolean;
}

/**
 * 메인 사이드바 컴포넌트 타입
 */
export interface SidebarProps {
  /**
   * 사이드바 너비 (픽셀 또는 CSS 값)
   * @default '250px'
   */
  width?: string | number;

  /**
   * 접혔을 때 사이드바 너비 (픽셀 또는 CSS 값)
   * @default '64px'
   */
  collapsedWidth?: string | number;

  /**
   * 사이드바 접기/펼치기 상태
   * @default false
   */
  isCollapsed?: boolean;

  /**
   * 사이드바 접기/펼치기 토글 함수
   */
  onToggleCollapse?: () => void;

  /**
   * 사이드바 헤더 컴포넌트
   */
  header?: ReactNode;

  /**
   * 사이드바 푸터 컴포넌트
   */
  footer?: ReactNode;

  /**
   * 사이드바 내용
   */
  children: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 사이드바 위치 (left/right)
   * @default 'left'
   */
  position?: "left" | "right";

  /**
   * 사이드바 고정 여부
   * @default true
   */
  fixed?: boolean;

  /**
   * 사이드바 그림자 효과 여부
   * @default true
   */
  shadow?: boolean;

  /**
   * 사이드바 테두리 여부
   * @default true
   */
  bordered?: boolean;

  /**
   * 사용자 프로필 정보
   */
  userProfile?: {
    name: string;
    role?: string;
    avatar?: string | ReactNode;
    email?: string;
  };
}
