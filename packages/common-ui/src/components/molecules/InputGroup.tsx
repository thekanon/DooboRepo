import React, {
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
  ReactNode,
} from "react";
import classNames from "classnames";
import styles from "./InputGroup.module.scss";

export interface InputGroupProps {
  direction?: "horizontal" | "vertical";
  spacing?: "sm" | "md" | "lg";
  prefix?: ReactNode;
  suffix?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  disabled?: boolean;
  uniformSize?: boolean;
  style?: React.CSSProperties;
}

// props에 size 속성이 있는 타입 정의
interface PropsWithSize {
  size?: string;
  disabled?: boolean;
  [key: string]: any;
}

/** ReactNode → ReactElement 배열로 캐스팅해 주는 헬퍼 */
const toElementArray = (nodes: ReactNode): ReactElement[] =>
  Children.toArray(nodes).filter(isValidElement) as ReactElement[];

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
  ...rest
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

  /** 최초 size 값을 캐싱(있으면) */
  const elements = toElementArray(children);
  const firstSized = uniformSize
    ? elements.find(
        (c) => c.props && typeof c.props === "object" && "size" in c.props
      )
    : undefined;

  const uniformSizeValue =
    uniformSize &&
    firstSized &&
    firstSized.props &&
    typeof firstSized.props === "object" &&
    "size" in firstSized.props
      ? (firstSized.props as PropsWithSize).size
      : undefined;

  const enhancedChildren = elements.map((child) => {
    // props에 대한 타입 단언
    const childProps = child.props as PropsWithSize;

    const nextProps: PropsWithSize = {
      ...childProps,
      disabled: disabled || childProps.disabled,
    };

    if (
      uniformSizeValue !== undefined &&
      typeof childProps === "object" &&
      "size" in childProps
    ) {
      nextProps.size = uniformSizeValue;
    }

    return cloneElement(child, nextProps);
  });

  return (
    <Component className={groupClasses} {...rest}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      <div className={styles.content}>{enhancedChildren}</div>
      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </Component>
  );
};

InputGroup.displayName = "InputGroup";
