import React, { Children, isValidElement, cloneElement } from "react";
import classNames from "classnames";
import styles from "./InputGroup.module.scss";

export interface InputGroupProps {
  /**
   * 입력 요소들을 수평 또는 수직으로 배치
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";

  /**
   * 그룹 내 요소들 사이의 간격 크기
   * @default "md"
   */
  spacing?: "sm" | "md" | "lg";

  /**
   * 좌측에 표시될 요소 (라벨, 아이콘 등)
   */
  prefix?: React.ReactNode;

  /**
   * 우측에 표시될 요소 (버튼, 아이콘 등)
   */
  suffix?: React.ReactNode;

  /**
   * 그룹이 전체 너비를 차지할지 여부
   * @default true
   */
  fullWidth?: boolean;

  /**
   * 입력 그룹 내부 요소
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 컨테이너 태그
   * @default "div"
   */
  as?: React.ElementType;

  /**
   * 비활성화 상태를 모든 자식 요소에 적용
   * @default false
   */
  disabled?: boolean;

  /**
   * 모든 입력 요소에 동일한 크기 적용
   * @default false
   */
  uniformSize?: boolean;

  /**
   * 인라인 스타일 객체
   */
  style?: React.CSSProperties;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  direction = "horizontal",
  spacing = "md",
  prefix,
  suffix,
  fullWidth = true,
  children,
  className,
  as: Component = "div",
  disabled = false,
  uniformSize = false,
}) => {
  const groupClasses = classNames(
    styles.inputGroup,
    styles[`direction-${direction}`],
    styles[`spacing-${spacing}`],
    {
      [styles.fullWidth]: fullWidth,
      [styles.disabled]: disabled,
      [styles.hasPrefix]: !!prefix,
      [styles.hasSuffix]: !!suffix,
    },
    className
  );

  // 자식 요소들에 disabled 속성 전달
  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      // size 속성이 있을 경우 uniformSize가 true일 때 동일한 size 적용
      const childProps: Record<string, any> = {
        ...child.props,
        disabled: disabled || child.props.disabled,
      };

      if (uniformSize && "size" in child.props) {
        const firstChild = Children.toArray(children).find(
          (c) => isValidElement(c) && "size" in c.props
        );

        if (isValidElement(firstChild) && "size" in firstChild.props) {
          childProps.size = firstChild.props.size;
        }
      }

      return cloneElement(child, childProps);
    }
    return child;
  });

  return (
    <Component className={groupClasses}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      <div className={styles.content}>{enhancedChildren}</div>
      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </Component>
  );
};

InputGroup.displayName = "InputGroup";
