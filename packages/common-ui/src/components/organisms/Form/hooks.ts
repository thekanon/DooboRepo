import { useState, useEffect, useCallback, FormEvent } from "react";
import { UseFormReturn } from "./types";

/**
 * useForm 커스텀 훅
 *
 * React Hook Form과 유사한 API를 제공하는 간단한 폼 상태 관리 훅입니다.
 * 추후 외부 라이브러리(React Hook Form 등)로 쉽게 대체할 수 있도록 비슷한 인터페이스를 유지합니다.
 *
 * @param {Object} options - 폼 옵션
 * @param {Object} options.initialValues - 폼의 초기값
 * @param {Function} options.onSubmit - 폼 제출 시 호출되는 함수
 * @param {Function} options.validate - 폼 유효성 검증 함수
 * @returns {UseFormReturn} 폼 상태 및 헬퍼 함수들
 */
export function useForm<T extends Record<string, any> = Record<string, any>>({
  initialValues = {} as T,
  onSubmit,
  validate,
}: {
  initialValues?: T;
  onSubmit?: (values: T) => void | Promise<void>;
  validate?: (values: T) => Record<string, string>;
} = {}): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // 값이 변경되면 폼이 더티 상태임을 표시
  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [values, initialValues]);

  // 개별 필드 값 설정
  const setValue = useCallback((name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  // 개별 필드 오류 설정
  const setError = useCallback((name: string, error: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  // 개별 필드 터치 상태 설정
  const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: isTouched,
    }));
  }, []);

  // 모든 필드 터치 상태 설정
  const setAllTouched = useCallback(
    (isTouched: boolean) => {
      const touchedFields: Record<string, boolean> = {};

      // 모든 필드에 대해 터치 상태 설정
      Object.keys(values).forEach((key) => {
        touchedFields[key] = isTouched;
      });

      setTouched(touchedFields);
    },
    [values]
  );

  // 필드 변경 이벤트 핸들러
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value, type } = e.target;

      // Checkbox인 경우 checked 값을 사용
      if (type === "checkbox") {
        const target = e.target as HTMLInputElement;
        setValue(name, target.checked);
      } else {
        setValue(name, value);
      }
    },
    [setValue]
  );

  // 필드 blur 이벤트 핸들러
  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name } = e.target;
      setFieldTouched(name, true);
      validateField(name);
    },
    [setFieldTouched]
  );

  // 전체 폼 유효성 검증
  const validateForm = useCallback(() => {
    if (validate) {
      const formErrors = validate(values);
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    }
    return true;
  }, [values, validate]);

  // 개별 필드 유효성 검증
  const validateField = useCallback(
    (name: string) => {
      if (validate) {
        const formErrors = validate(values);
        const fieldError = formErrors[name];

        if (fieldError) {
          setError(name, fieldError);
          return false;
        } else {
          // 해당 필드 오류 제거
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
          });
          return true;
        }
      }
      return true;
    },
    [values, validate, setError]
  );

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 모든 필드를 터치 상태로 변경
      setAllTouched(true);

      // 폼 유효성 검증
      const isValid = validateForm();

      if (isValid && onSubmit) {
        setIsSubmitting(true);

        try {
          const result = onSubmit(values);

          // Promise인 경우 처리
          if (result instanceof Promise) {
            result
              .then(() => {
                setIsSubmitting(false);
              })
              .catch(() => {
                setIsSubmitting(false);
              });
          } else {
            setIsSubmitting(false);
          }
        } catch (error) {
          setIsSubmitting(false);
        }
      }
    },
    [values, onSubmit, validateForm, setAllTouched]
  );

  // 폼 초기화
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsDirty(false);
  }, [initialValues]);

  // 폼이 유효한지 여부 계산
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    setValue,
    setError,
    setTouched: setFieldTouched,
    setAllTouched,
    handleSubmit,
    resetForm,
    validateForm,
    validateField,
    handleChange,
    handleBlur,
  };
}
