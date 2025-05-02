import { ReactNode, FormEvent, FormHTMLAttributes } from "react";

/**
 * Form의 레이아웃 타입
 */
export type FormLayout = "vertical" | "horizontal" | "inline";

/**
 * Form의 크기
 */
export type FormSize = "sm" | "md" | "lg";

/**
 * Form validation 상태를 정의하는 타입
 */
export interface ValidationStatus {
  isValid: boolean;
  errors: Record<string, string[]>;
  errorMessages: string[];
}

/**
 * Form 제출 시 발생하는 이벤트 핸들러의 인자 타입
 */
export interface FormSubmitEvent<T = Record<string, any>> {
  preventDefault: () => void;
  stopPropagation: () => void;
  values: T;
  originalEvent: FormEvent<HTMLFormElement>;
}

/**
 * Form 컴포넌트의 Props
 */
export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /**
   * 폼의 레이아웃 방향
   * @default "vertical"
   */
  layout?: FormLayout;

  /**
   * 폼 요소들의 크기
   * @default "md"
   */
  size?: FormSize;

  /**
   * 폼 내부 컨텐츠
   */
  children: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 폼 제출 시 호출되는 함수
   */
  onSubmit?: (event: FormSubmitEvent) => void | Promise<void>;

  /**
   * 폼의 제출 중 상태
   * @default false
   */
  isSubmitting?: boolean;

  /**
   * 폼이 변경되었는지 여부
   * @default false
   */
  isDirty?: boolean;

  /**
   * 폼의 유효성 검증 여부
   * @default true
   */
  isValid?: boolean;

  /**
   * 폼 유효성 검증 메시지
   */
  validationStatus?: ValidationStatus;

  /**
   * 폼의 초기값
   */
  initialValues?: Record<string, any>;

  /**
   * 오류 메시지 표시 위치
   * @default "field"
   */
  errorMessagePlacement?: "field" | "summary" | "both";

  /**
   * 폼 레이블 너비 (horizontal 레이아웃에서만 사용)
   * @default "auto"
   */
  labelWidth?: string | number;

  /**
   * 폼 필드 너비
   * @default "auto"
   */
  fieldWidth?: string | number;

  /**
   * 폼이 전체 너비를 차지할지 여부
   * @default true
   */
  fullWidth?: boolean;

  /**
   * 폼 요소 간 간격
   * @default "md"
   */
  spacing?: "sm" | "md" | "lg";

  /**
   * 폼 요소 정렬
   * @default "start"
   */
  align?: "start" | "center" | "end";

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 읽기 전용 상태
   * @default false
   */
  readOnly?: boolean;

  /**
   * 폼 요소에 적용할 기본 props
   */
  fieldDefaults?: Record<string, any>;

  /**
   * 폼 외부 테두리 여부
   * @default false
   */
  bordered?: boolean;

  /**
   * 폼 제출 성공 메시지
   */
  successMessage?: string;

  /**
   * 폼 제출 실패 메시지
   */
  errorMessage?: string;
}

/**
 * FormSection 컴포넌트의 Props
 */
export interface FormSectionProps {
  /**
   * 섹션 제목
   */
  title?: ReactNode;

  /**
   * 섹션 설명
   */
  description?: ReactNode;

  /**
   * 섹션 내부 컨텐츠
   */
  children: ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 섹션이 접힐 수 있는지 여부
   * @default false
   */
  collapsible?: boolean;

  /**
   * 초기 상태가 접혀있는지 여부 (collapsible이 true인 경우에만 적용)
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * 섹션의 테두리 표시 여부
   * @default true
   */
  bordered?: boolean;

  /**
   * 섹션 내부의 여백 크기
   * @default "md"
   */
  padding?: "sm" | "md" | "lg" | "none";

  /**
   * 섹션 상단에 표시할 액션 요소
   */
  actions?: ReactNode;

  /**
   * 인라인 스타일 객체
   */
  style?: React.CSSProperties;
}

/**
 * FormFooter 컴포넌트의 Props
 */
export interface FormFooterProps {
  /**
   * 저장 버튼 텍스트
   * @default "저장"
   */
  submitText?: string;

  /**
   * 취소 버튼 텍스트
   * @default "취소"
   */
  cancelText?: string;

  /**
   * 저장 버튼 클릭 시 호출되는 함수
   */
  onSubmit?: () => void;

  /**
   * 취소 버튼 클릭 시 호출되는 함수
   */
  onCancel?: () => void;

  /**
   * 추가 액션 버튼
   */
  extraActions?: ReactNode;

  /**
   * 제출 중 상태
   * @default false
   */
  isSubmitting?: boolean;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 취소 버튼 표시 여부
   * @default true
   */
  showCancel?: boolean;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 버튼 정렬 방식
   * @default "end"
   */
  align?: "start" | "center" | "end" | "between";

  /**
   * 하단 영역 고정 여부
   * @default false
   */
  sticky?: boolean;

  /**
   * 인라인 스타일 객체
   */
  style?: React.CSSProperties;
}

/**
 * useForm 훅의 반환 타입
 */
export interface UseFormReturn<T = Record<string, any>> {
  /**
   * 현재 폼 값
   */
  values: T;

  /**
   * 폼 오류
   */
  errors: Record<string, string>;

  /**
   * 터치된 필드
   */
  touched: Record<string, boolean>;

  /**
   * 폼이 제출 중인지 여부
   */
  isSubmitting: boolean;

  /**
   * 폼이 유효한지 여부
   */
  isValid: boolean;

  /**
   * 폼이 변경되었는지 여부
   */
  isDirty: boolean;

  /**
   * 필드 값 설정
   */
  setValue: (name: string, value: any) => void;

  /**
   * 필드 오류 설정
   */
  setError: (name: string, error: string) => void;

  /**
   * 필드 터치 상태 설정
   */
  setTouched: (name: string, isTouched: boolean) => void;

  /**
   * 모든 필드 터치 상태 설정
   */
  setAllTouched: (isTouched: boolean) => void;

  /**
   * 폼 제출 핸들러
   */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;

  /**
   * 폼 리셋
   */
  resetForm: () => void;

  /**
   * 폼 유효성 검증
   */
  validateForm: () => boolean;

  /**
   * 필드 유효성 검증
   */
  validateField: (name: string) => boolean;

  /**
   * 필드 변경 핸들러
   */
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;

  /**
   * 필드 블러 핸들러
   */
  handleBlur: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}
